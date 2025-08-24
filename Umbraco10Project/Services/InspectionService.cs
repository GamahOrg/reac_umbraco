using System.Net;
using System.Runtime.Caching;
using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Controllers;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public class InspectionService(
    RestClient client,
    string clientId,
    string clientSecret,
    IConfiguration configuration
) : ApigeeBase(client, clientId, clientSecret)
{
    public GenericApiResponse<InspectionModel> GetForm()
    {
        var cacheItem = MemoryCache.Default.GetCacheItem("inspectionForm");
        if (cacheItem != null && configuration.GetValue<string>("AppEnvironment") == "Production")
            return JsonConvert.DeserializeObject<GenericApiResponse<InspectionModel>>(
                cacheItem.Value.ToString()
            );

        var request = new RestRequest("/v1/rega/inspection/Event/RenderForm")
        {
            Method = Method.Get,
        };
        var inspectionActivityId = configuration.GetValue<string>("InspectionActivityId");
        var inspectionEventTypeId = configuration.GetValue<string>("InspectionEventTypeId");
        if (
            string.IsNullOrEmpty(inspectionEventTypeId)
            || string.IsNullOrEmpty(inspectionActivityId)
        )
            throw new Exception("InspectionEventTypeId or InspectionActivityId is not set");

        request.AddParameter("eventTypeId", inspectionEventTypeId, ParameterType.QueryString);
        request.AddParameter("activityId", inspectionActivityId, ParameterType.QueryString);
        request.AddParameter("formId", "21", ParameterType.QueryString);

        request.AddParameter("groupedBySection", "true", ParameterType.QueryString);
        request.AddParameter("lang", "0", ParameterType.QueryString);

        var response = SendRequest(request);
        if (!response.IsSuccessful)
            throw new Exception(response.Content);
        if (response.Content == null)
            throw new Exception("No Content Found");

        // cache the response for 1h
        var timeToLive = DateTime.Now.AddHours(1);
        MemoryCache.Default.Add("inspectionForm", response.Content, timeToLive);
        return JsonConvert.DeserializeObject<GenericApiResponse<InspectionModel>>(
            response.Content ?? "{}"
        );
    }

    public GenericApiResponse<UploadImageDate>? Upload(IFormFile file)
    {
        var request = new RestRequest($"/v1/rega/inspection/Helpers/UploadImage")
        {
            Method = Method.Post,
        };
        request.AddParameter("formId", "21", ParameterType.QueryString);
        request.AddParameter("fieldId", file.Name, ParameterType.QueryString);
        request.AddParameter("Lang", "0", ParameterType.QueryString);

        request.AddHeader("Content-Type", "multipart/form-data");

        // Convert IFormFile to byte array
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        byte[] fileBytes = memoryStream.ToArray();

        // Add file to the request with a specified form field name
        request.AddFile("file", fileBytes, file.FileName, file.ContentType);

        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        if (response.Content == null)
        {
            return null;
        }

        return JsonConvert.DeserializeObject<GenericApiResponse<UploadImageDate>>(response.Content);
    }

    public GenericApiResponse<SubmitModel> Submit(SubmitData responseBody)
    {
        // /api/Event/SubmitReport`
        var request = new RestRequest("/v1/rega/inspection/Event/SubmitEvent")
        {
            Method = Method.Post,
        };
        request.AddParameter("lang", "0", ParameterType.QueryString);
        var inspectionActivityId = configuration.GetValue<string>("InspectionActivityId");
        if (string.IsNullOrEmpty(inspectionActivityId))
            throw new Exception("InspectionActivityId is not set");
        responseBody.ActivityId = inspectionActivityId;

        var eventTypeId = configuration.GetValue<string>("InspectionEventTypeId");
        if (string.IsNullOrEmpty(eventTypeId))
            throw new Exception("InspectionEventTypeId is not set");
        responseBody.EventTypeId = eventTypeId;

        request.AddJsonBody(responseBody);

        var response = SendRequest(request);
        if (!response.IsSuccessful)
            throw new Exception("No Content Found");
        return JsonConvert.DeserializeObject<GenericApiResponse<SubmitModel>>(
            response.Content ?? "{}"
        );
    }

    public GenericApiResponse<UpdateModel> Update(SubmitData responseBody)
    {
        var request = new RestRequest("/v1/rega/inspection/Event/UpdateEvent")
        {
            Method = Method.Post,
        };
        request.AddParameter("lang", "0", ParameterType.QueryString);
        var inspectionActivityId = configuration.GetValue<string>("InspectionActivityId");
        if (string.IsNullOrEmpty(inspectionActivityId))
            throw new Exception("InspectionActivityId is not set");
        responseBody.ActivityId = inspectionActivityId;

        var eventTypeId = configuration.GetValue<string>("InspectionEventTypeId");
        if (string.IsNullOrEmpty(eventTypeId))
            throw new Exception("InspectionEventTypeId is not set");
        responseBody.EventTypeId = eventTypeId;

        request.AddJsonBody(responseBody);

        var response = SendRequest(request);
        if (!response.IsSuccessful)
            throw new Exception("No Content Found");
        var parsedResponse = JsonConvert.DeserializeObject<GenericApiResponse<UpdateModel>>(
            response.Content ?? "{}"
        );
        if (!parsedResponse.Success)
            throw new Exception(parsedResponse.ErrorAr);
        return parsedResponse;
    }

    public GenericApiResponse<EventResponse> ListRequests(string nationalId)
    {
        var request = new RestRequest("/v1/rega/inspection/Event/GetReportsByActivityType")
        {
            Method = Method.Post,
        };
        var body = new ListRequestsRequestBody(new QuestionFilter([new FilterDetails(nationalId)]));
        var inspectionActivityId = configuration.GetValue<string>("InspectionActivityId");
        if (string.IsNullOrEmpty(inspectionActivityId))
            throw new Exception("InspectionActivityId is not set");
        body.ActivityId = inspectionActivityId;
        request.AddJsonBody(body);

        var response = SendRequest(request);
        if (!response.IsSuccessful)
            throw new Exception("No Content Found");
        return JsonConvert.DeserializeObject<GenericApiResponse<EventResponse>>(
            response.Content ?? "{}"
        );
    }

    public GenericApiResponse<ReportDetails> ReportDetails(string eventId, bool grouped = true)
    {
        var request = new RestRequest("/v1/rega/inspection/Event/GetEventDetails/{eventId}")
        {
            Method = Method.Get,
        };
        request.AddParameter("groupedBySection", grouped.ToString(), ParameterType.QueryString);
        request.AddParameter("forEdit", "true", ParameterType.QueryString);
        request.AddParameter("lang", "0", ParameterType.QueryString);
        request.AddParameter("eventId", eventId, ParameterType.UrlSegment);

        var response = SendRequest(request);
        if (!response.IsSuccessful || response.Content == null)
            throw new Exception("No Content Found");
        if (response.StatusCode == HttpStatusCode.NotFound)
            throw new Exception("Not Found");
        if (response.Content == null)
            return new GenericApiResponse<ReportDetails>
            {
                Success = false,
                ErrorAr = "No Content Found",
            };

        return JsonConvert.DeserializeObject<GenericApiResponse<ReportDetails>>(response.Content);
    }
}

internal class ListRequestsRequestBody(QuestionFilter questionFilter)
{
    public int Lang { get; set; } = 0;
    public string SortOrder { get; set; } = "date_desc";
    public int PageSize { get; set; } = 100;
    public int TypeId { get; set; } = 1;
    public string ActivityId { get; set; } = "55adc6b8-3cc5-4d44-a496-b31fab6f6d63";
    public QuestionFilter QuestionFilter { get; set; } = questionFilter;
}

internal class QuestionFilter(List<FilterDetails> filterDetails)
{
    public List<FilterDetails> FilterDetails { get; set; } = filterDetails;
}

internal class FilterDetails(string answer)
{
    public string QuestionId { get; set; } = "bf538fb6-d7f6-4dc3-873c-b5eda1380aa0";
    public string Answer { get; set; } = answer;
}
