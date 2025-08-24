using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "WafiProjects")]
public class WafiProjectsViewComponent(WafiService wafiService) : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(WafiProjectQueryParms queryParms,string modelTitle = "",string linkedToPageUrl = "", bool showController = true, bool showAlert = false)
    {
        // Perform any logic you need for the partial view
        WafiProjectList response = new WafiProjectList();
        WafiCityList cityList = new WafiCityList();
        WafiLicenseRequestTypes licenseRequestTypes = new WafiLicenseRequestTypes();
        try
        {
            response = await wafiService.GetProjectList(queryParms);
            cityList = await wafiService.GetCityList();
            licenseRequestTypes = await wafiService.GetLicenseRequestTypes();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        var customModel = new WafiModel()
        {
            Title = modelTitle,
            ResultPage = linkedToPageUrl,
            ShowController = showController,
            ShowAlert = showAlert,
            QueryParm = new WafiProjectQueryParms()
            {
                ModelUrl = queryParms.ModelUrl,
                CurrentPage = queryParms.CurrentPage,
                LicenseRequestTypeId = queryParms.LicenseRequestTypeId,
                CityId = queryParms.CityId
            },
            response = response,
            cityList = cityList,
            licenseRequestType = licenseRequestTypes,
            
        };

        return View("WafiProjects", customModel);
    }
}