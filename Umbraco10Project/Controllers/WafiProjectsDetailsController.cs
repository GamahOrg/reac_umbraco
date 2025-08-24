using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Newtonsoft.Json;
using RestSharp;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco10Project.Models;
using Microsoft.IdentityModel.Tokens;
using Umbraco10Project.Services;
using uSync.Core;

namespace Umbraco10Project.Controllers;

public class WafiProjectsDetailsController : RenderController
{
    private readonly ServiceContext _serviceContext;
    private readonly IVariationContextAccessor _variationContextAccessor;
    private readonly WafiService _wafiService;

    public WafiProjectsDetailsController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IVariationContextAccessor variationContextAccessor,
        ServiceContext serviceContext,
        WafiService wafiService)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _serviceContext = serviceContext;
        _variationContextAccessor = variationContextAccessor;
        _wafiService = wafiService;
    }

    public override IActionResult Index()
    {
        // Get the 'id' query parameter
        var id = HttpContext.Request.Query["id"].ToString();

        // If 'id' is available, fetch project details from the API
        if (id.IsNullOrWhiteSpace())
            return CurrentTemplate(new WafiProjectDetailsModel(CurrentPage,
                    new PublishedValueFallback(_serviceContext, _variationContextAccessor))
                { ShowResult = false });

        try
        {

            var response =  _wafiService.GetProjectDetailsById(id).Result;
            return CurrentTemplate(new WafiProjectDetailsModel(CurrentPage,
                new PublishedValueFallback(_serviceContext, _variationContextAccessor))
            {
                ShowResult = true,
                response = response
            });
        }
        catch (Exception e)
        {
            return CurrentTemplate(new WafiProjectDetailsModel(CurrentPage,
                    new PublishedValueFallback(_serviceContext, _variationContextAccessor))
                { ShowResult = false });
        }
    }

 
}