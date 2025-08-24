using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Helpers;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "RerTitleInquiry")]
public class RerTitleInquiryViewComponent(RerService rerService) : ViewComponent {
    public IViewComponentResult Invoke(RerTitleInquiryQueryParms queryParms, string modelTitle = "", bool showController = true, bool showAlert = false)
    {
        // Perform any logic you need for the partial view
        RerTitleInquiryResponse response = new RerTitleInquiryResponse();
        if(!string.IsNullOrWhiteSpace(queryParms.FirstRegistrationDate))
        {
            queryParms.FirstRegistrationDate = Calendar.FormatHijriDate(queryParms.FirstRegistrationDate.Replace("\\/", "/"));
        }
        try
        {
            response = rerService.GetTitleInquiry(queryParms);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

  
        var customModel = new RerTitleInquiryModel()
        {
            Title = modelTitle,
            ShowAlert = showAlert,
            ShowController = showController,
            QueryParm = new RerTitleInquiryQueryParms()
            {
                ModelUrl = queryParms.ModelUrl,
                RealEstateNumber = queryParms.RealEstateNumber,
                IdNumber = queryParms.IdNumber,
                FirstRegistrationDate = queryParms.FirstRegistrationDate
            },
            response = response,
            
        };

        return View("RerTitleInquiry", customModel);
    }
}