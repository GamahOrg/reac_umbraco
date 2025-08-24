using System.Collections;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco10Project.Controllers.Models.InspectionModels;
using Umbraco10Project.Helpers.Attributes;
using Umbraco10Project.Models;
using Umbraco10Project.Services;

namespace Umbraco10Project.Controllers;

public class InspectionController(
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    ServiceContext services,
    AppCaches appCaches,
    UmbracoHelper umbracoHelper,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider,
    IMapper mapper,
    InspectionService inspectionService
)
    : SurfaceController(
        umbracoContextAccessor,
        databaseFactory,
        services,
        appCaches,
        profilingLogger,
        publishedUrlProvider
    )
{
    [HttpPost]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult Upload()
    {
        var file = Request.Form.Files[0];
        var response = inspectionService.Upload(file);
        if (!response.Success)
        {
            return BadRequest(response.ErrorEn);
        }

        return Ok(response.Data.ImageName);
    }

    [HttpGet]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public RequestSummaryResponse GetRequests()
    {
        var nationalId = HttpContext.Session.GetString("userNationalId");
        var requests = inspectionService.ListRequests(nationalId);
        var summaries = mapper.Map<List<RequestSummary>>(requests.Data.Events);

        var response = new RequestSummaryResponse
        {
            Requests = summaries,
            TotalCount = requests.Data.EventsCount,
        };
        return response;
    }

    // you should receive the data with type of [{key: value}] all string string
    [HttpPost]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult Submit([FromBody] Dictionary<string, string> data)
    {
        var renderedForm = inspectionService.GetForm();
        if (renderedForm.Data?.Fields == null)
            return BadRequest("No form found");

        // Prepare the data to be submitted
        var answeredFields = new List<Field>();

        // Populate answered fields
        foreach (var field in renderedForm.Data.Fields.SelectMany(section => section.Fields))
            if (
                field.Id != null
                && data.TryGetValue(field.Id, out var fieldValue)
                && !string.IsNullOrEmpty(fieldValue)
            )
            {
                field.Values ??= new ArrayList();
                // if "location:" in the value, split it and add the values to the field
                if (field.ControlType == "GPS")
                {
                    var locationValues = fieldValue.Split(",");
                    field.Values.AddRange(locationValues);
                }
                else
                    field.Values.Add(fieldValue);

                answeredFields.Add(field);
            }

        // Override or add the name & id from session
        var fullName = HttpContext.Session.GetString("fullName");
        var userNationalId = HttpContext.Session.GetString("userNationalId");
        if (fullName == null || userNationalId == null)
            return BadRequest("User data not found");

        AddOrUpdateField("3f6e6154-ab61-468b-9a5c-65a7adcb952c", fullName);
        AddOrUpdateField("bf538fb6-d7f6-4dc3-873c-b5eda1380aa0", userNationalId);

        var submittedJsonData = JsonConvert.SerializeObject(
            new InspectionModel { Fields = answeredFields }
        );
        var response = inspectionService.Submit(new SubmitData(submittedJsonData));
        return Ok(response);

        // Helper to add or update a field
        void AddOrUpdateField(string fieldId, string sessionValue)
        {
            var fieldFromRenderedForm = renderedForm
                .Data.Fields.SelectMany(f => f.Fields)
                .FirstOrDefault(f => f.Id == fieldId);
            if (fieldFromRenderedForm == null)
                throw new Exception($"Field with id {fieldId} not found in rendered form");

            fieldFromRenderedForm.Values = new ArrayList { sessionValue };

            // delete the field if it was already answered
            answeredFields.RemoveAll(f => f.Id == fieldId);
            // add the field to the answered fields
            answeredFields.Add(fieldFromRenderedForm);
        }
    }

    // you should receive the data with type of [{key: value}] all string string
    [HttpPost]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult Update([FromBody] Dictionary<string, string> data, string reportId)
    {
        // todo add captcha
        // todo fix this hardcoded value
        var renderedForm = inspectionService.ReportDetails(reportId, grouped: false);
        if (!renderedForm.Success)
            return BadRequest(renderedForm.ErrorAr);
        if (renderedForm.Data == null)
            return BadRequest("No data found");

        // update rendered form with the new data
        foreach (var field in renderedForm.Data.Details.SubmittedJsonData.Fields)
        {
            if (
                data.TryGetValue(field.Id, out var fieldValue)
                && field.ControlType == "ATTACHMENT_AREA"
            )
            {
                field.Values = [fieldValue];
            }
        }

        var submittedJsonData = JsonConvert.SerializeObject(
            new InspectionModel2 { Fields = renderedForm.Data.Details.SubmittedJsonData.Fields }
        );
        var response = inspectionService.Update(new SubmitData(submittedJsonData, reportId));
        return Ok(response);
    }

    [HttpGet]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult ReportDetails(string reportId)
    {
        // todo add captcha
        var response = inspectionService.ReportDetails(reportId);
        if (!response.Success)
            return BadRequest(response.ErrorAr);
        if (response.Data == null)
            return BadRequest("No data found");

        var sections = response.Data.Details.SubmittedJsonData.Fields;
        var userNationalId = sections
            .SelectMany(s => s.Fields)
            .FirstOrDefault(f => f.Id == "bf538fb6-d7f6-4dc3-873c-b5eda1380aa0")
            ?.Values?[0]?.ToString();

        var loggedInUserNationalId = HttpContext.Session.GetString("userNationalId");
        if (userNationalId != loggedInUserNationalId)
            return NotFound("Report not found");

        // remove any field with visibilityView.Count > 0
        var filteredSections = new List<ReportDetailsField>();
        foreach (var section in sections)
        {
            if (section.ArLabel is "المستندات الناقصة" or "المرفقات")
            {
                filteredSections.Add(section);
                continue;
            }

            if (section.VisibilityView.Count > 0)
                continue;

            if (section.Fields != null)
            {
                var filteredFields = section
                    .Fields.Where(field => field.VisibilityView.Count <= 0)
                    .Where(field => field.Values.Count > 0)
                    .ToList();

                section.Fields = filteredFields;
            }

            if (section.Fields is { Count: > 0 })
                filteredSections.Add(section);
        }

        response.Data.Details.SubmittedJsonData.Fields = filteredSections;
        var mappedResponse = mapper.Map<ComplaintDetailsModel>(response.Data);
        return Ok(mappedResponse);
    }

    [HttpPost]
    public IActionResult GoTo(IFormCollection obj)
    {
        var formId = obj["formId"].ToString();
        var pageId = obj["pageId"].ToString();
        TempData["Incpection_form_id"] = formId;
        var pageRoot = umbracoHelper.Content(pageId);
        if (pageRoot != null && pageRoot.Children.FirstOrDefault() != null)
        {
            return RedirectToUmbracoPage(pageRoot.Children.First().Key);
        }

        return CurrentUmbracoPage();
    }
}

// function

public class SubmitData(string submittedJsonData, string? eventId = null)
{
    public string? EventId { get; set; } = eventId;
    public string EventTypeId { get; set; } = "1";
    public int FormId { get; set; } = 21;
    public string ActivityId { get; set; } = "55adc6b8-3cc5-4d44-a496-b31fab6f6d63";
    public string SubmittedJsonData { get; set; } = submittedJsonData;
    public string CorrelationId { get; set; } = Guid.NewGuid().ToString();
}
