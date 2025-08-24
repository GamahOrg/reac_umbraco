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

public class EjarContractDetailsController : RenderController
{
    private readonly ServiceContext _serviceContext;
    private readonly IVariationContextAccessor _variationContextAccessor;
    private readonly EjarService _ejarService;

    public EjarContractDetailsController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IVariationContextAccessor variationContextAccessor,
        ServiceContext serviceContext,
        EjarService ejarService)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _serviceContext = serviceContext;
        _variationContextAccessor = variationContextAccessor;
        _ejarService = ejarService;
    }

    public override IActionResult Index()
    {
        // Get the 'id' query parameter
        var id_number = HttpContext.Request.Query["id_number"].ToString();
        var contract_number = HttpContext.Request.Query["contract_number"].ToString();
        var major_version = HttpContext.Request.Query["major_version"].ToString();
        var minor_version = HttpContext.Request.Query["minor_version"].ToString();

        // If 'id' is available, fetch project details from the API
        if (id_number.IsNullOrWhiteSpace())
            return CurrentTemplate(new EjarContractDetailsModel(CurrentPage,
                    new PublishedValueFallback(_serviceContext, _variationContextAccessor))
                { ShowResult = false });

        try
        {

            var response =  _ejarService.GetContractDetails(id_number, contract_number, major_version, minor_version);
            return CurrentTemplate(new EjarContractDetailsModel(CurrentPage,
                new PublishedValueFallback(_serviceContext, _variationContextAccessor))
            {
                ShowResult = true,
                response = response
            });
        }
        catch (Exception e)
        {
            return CurrentTemplate(new EjarContractDetailsModel(CurrentPage,
                    new PublishedValueFallback(_serviceContext, _variationContextAccessor))
                { ShowResult = false });
        }
    }

 
}