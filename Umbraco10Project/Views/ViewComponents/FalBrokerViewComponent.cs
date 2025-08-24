using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "FalBroker")]
public class FalBrokerViewComponent(FalService falService) : ViewComponent
{
    public IViewComponentResult Invoke(FalBrokerQueryParms queryParms, string modelTitle = "", bool showController = true, bool showAlert = false)
    {
        // Perform any logic you need for the partial view
        FalBrokerResponse response = new FalBrokerResponse();
        try
        {
            response = falService.GetBrokerLicensesInformation(queryParms);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        var customModel = new FalBrokerModel()
        {
            Title = modelTitle,
            ShowAlert = showAlert,
            ShowController = showController,
            QueryParm = new FalBrokerQueryParms()
            {
                ModelUrl = queryParms.ModelUrl,
                IdNumber = queryParms.IdNumber,
                BrokerType = queryParms.BrokerType
            },
            response = response,
            
        };

        return View("FalBroker", customModel);
    }
}