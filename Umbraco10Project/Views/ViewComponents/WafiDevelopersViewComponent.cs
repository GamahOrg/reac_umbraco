using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Newtonsoft.Json;
using RestSharp;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco10Project.Controllers;
using Umbraco10Project.Models;
using Umbraco10Project.Services;

namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "WafiDevelopers")]
public class WafiDevelopersViewComponent(WafiService wafiService) : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(WafiDeveloperQueryParms queryParms,string modelTitle = "", bool showController = true, bool showAlert = false)
    {
        // Perform any logic you need for the partial view
        var response = new CertifiedFacilities();
        var qualificationRequestType = new WafiQualificationTypes();

        try
        {
            response = await wafiService.GetCertifiedFacilities(queryParms);
            qualificationRequestType = await wafiService.GetQualificationTypes();

        }
        catch (Exception e)
        {
            response = new CertifiedFacilities();
        }

        var customModel = new WafiDevelopersModel()
        {
            Title = modelTitle,
            ShowController = showController,
            ShowAlert = showAlert,
            QualificationTypes = qualificationRequestType,
            QueryParm = new WafiDeveloperQueryParms()
            {
                ModelUrl = queryParms.ModelUrl,
                CurrentDeveloperPage = queryParms.CurrentDeveloperPage,
                QualificationTypeId = queryParms.QualificationTypeId,
                FacilityName = queryParms.FacilityName,
            },
            Response = response
        };

        return View("WafiDevelopers", customModel);
    }
}