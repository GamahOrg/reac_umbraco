using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Services;

namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "InspectionList")]
public class InspectionListViewComponent(IConfiguration configuration) : ViewComponent
{
    // private readonly InspectionService _inspectionService = new(
    //     configuration["variabels:CrmApiEndpoint"] ?? string.Empty,
    //     configuration["variabels:CrmClientId"] ?? string.Empty,
    //     configuration["variabels:CrmClientSecret"] ?? string.Empty);

    public IViewComponentResult Invoke()
    {
        // var formModel = _inspectionService.GetForm();
        // var nationalId = HttpContext.Session.GetString("userNationalId");
        // var fullName = HttpContext.Session.GetString("fullName");
        //
        // formModel.IdNumber = nationalId;
        // formModel.FullName = fullName;

        // Pass the deserialized data to the view
        // return View("InspectionList", formModel);
        return View("InspectionList");
    }
}