using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "RerRegistrar")]
public class RerRegistrarViewComponent(RerService rerService) : ViewComponent
{
    public IViewComponentResult Invoke(RerRegistrarQueryParms queryParms, string modelTitle = "", bool showController = true, bool showAlert = false)
    {
        // Perform any logic you need for the partial view
        RerRegistrarLicenseResponse response = new RerRegistrarLicenseResponse();
        try
        {
            response = rerService.GetRegistrarList(queryParms);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        var customModel = new RerRegistrarModel()
        {
            Title = modelTitle,
            ShowAlert = showAlert,
            ShowController = showController,
            QueryParm = new RerRegistrarQueryParms()
            {
                ModelUrl = queryParms.ModelUrl,
                CurrentPage = queryParms.CurrentPage,
                LicenseNumber = queryParms.LicenseNumber
            },
            response = response,
            
        };

        return View("RerRegistrar", customModel);
    }
}