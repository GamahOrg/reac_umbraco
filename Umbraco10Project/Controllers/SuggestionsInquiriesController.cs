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
using Umbraco10Project.Controllers.Models.SuggestionsInquiriesModels;
using Umbraco10Project.Helpers.Attributes;
using Umbraco10Project.Models;
using Umbraco10Project.Services;

namespace Umbraco10Project.Controllers;

public class SuggestionsInquiriesController(
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    ServiceContext services,
    AppCaches appCaches,
    UmbracoHelper umbracoHelper,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider,
    IMapper mapper,
    SuggestionsInquiriesService suggestionsInquiriesService
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
    private string moduleName = "Cases";

    [HttpGet]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult GetRegions()
    {
        var response = suggestionsInquiriesService.GetModuleFieldValues(moduleName, "rejon_c");
        if (!response.Success)
            return BadRequest(response.ErrorAr);
        if (response.Data == null)
            return BadRequest("No data found");
        return Ok(response);
    }

    [HttpGet]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult GetServices()
    {
        var response = suggestionsInquiriesService.GetModuleFieldValues(moduleName, "program_c");
        if (!response.Success)
            return BadRequest(response.ErrorAr);
        if (response.Data == null)
            return BadRequest("No data found");
        return Ok(response);
    }

    [HttpPost]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public async Task<ActionResult> Upload([FromForm] UploadFileRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var attachmentFile = request.attachmentFile;
        var response = await suggestionsInquiriesService.Upload(attachmentFile);
        if (!response.Success)
            return BadRequest(response.ErrorEn);
        return Ok(response.Data);
    }

    [HttpPost]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public async Task<ActionResult> Submit([FromBody] SubmitDataRequest data)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await suggestionsInquiriesService.Submit(data);
        if (!response.Success)
            return BadRequest(response.ErrorEn);
        return Ok(response.Data);
    }


    [HttpGet]
    [IgnoreAntiforgeryToken]
    [CheckNafathAccess]
    public ActionResult GetCaseNumber(string caseId)
    {
        var response = suggestionsInquiriesService.GetCaseNumber(caseId);
        if (!response.Success)
            return BadRequest(response.ErrorAr);
        if (response.Data == null)
            return BadRequest("No data found");
        return Ok(response);
    }



}