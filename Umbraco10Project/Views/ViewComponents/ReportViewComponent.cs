using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Models;

namespace Umbraco10Project.Views.ViewComponents
{
    [ViewComponent(Name = "ReportForm")]
    public class ReportViewComponent : ViewComponent
    {
        public ReportViewComponent() { }
        public IViewComponentResult Invoke()
        {
            //return View("~/Views/Partials/Contact Us Form.cshtml");
            var model = new ReportModel();

            return View("ReportForm", model);
        }
    }
}
