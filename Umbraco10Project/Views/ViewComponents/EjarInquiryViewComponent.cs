using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Helpers;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "EjarInquiry")]
public class EjarInquiryViewComponent(EjarService ejarService) : ViewComponent {
    public IViewComponentResult Invoke(EjarQueryParms queryParms, string modelTitle = "",string linkedToPageUrl = "", bool showController = true, bool showAlert = false)
    {
        // Perform any logic you need for the partial view
        EjarContractResponse response = new EjarContractResponse();

        try
        {
            response = ejarService.GetContractById(queryParms);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

  
        var customModel = new EjarInquiryModel()
        {
            Title = modelTitle,
            ShowAlert = showAlert,
            ShowController = showController,
            QueryParm = new EjarQueryParms()
            {
                ModelUrl = queryParms.ModelUrl,
                IdNumber = queryParms.IdNumber,
                BirthDateHijri = queryParms.BirthDateHijri
            },
            ResultPage = linkedToPageUrl,
            response = response,
            
        };

        return View("EjarInquiry", customModel);
    }
}