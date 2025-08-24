using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Umbraco10Project.Services;

using Umbraco10Project.Models;

namespace Umbraco10Project.Views.ViewComponents
{
    [ViewComponent(Name = "PrevReportForm")]
    public class PrevReportViewComponent : ViewComponent
    {
        private readonly IConfiguration _configure;
        private readonly CrmService crmService;

        public PrevReportViewComponent(IConfiguration configuration)
        {
            _configure = configuration;
            crmService = new CrmService(_configure["variabels:CrmApiEndpoint"] ?? string.Empty,
                _configure["variabels:CrmClientId"] ?? string.Empty,
                _configure["variabels:CrmClientSecret"] ?? string.Empty);
        }

        public IViewComponentResult Invoke()
        {
            string serialNumber = HttpContext.Session.GetString("serialNumber");
            if (serialNumber == null)
                return View("PrevReportFormError");
            var nationalId = HttpContext.Session.GetString("userNationalId");
            if (nationalId == null)
                return View("PrevReportFormError");

            List<Report> model = null;

            try
            {
                string content = crmService.GetReportsByCaseNumber(serialNumber);
                model = JsonConvert.DeserializeObject<List<Report>>(content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            if (model == null)
                return View("PrevReportFormError");


            Report filteredReport = model.FirstOrDefault();
            if (filteredReport.nid != nationalId)
                return View("PrevReportFormError");
            
            return View("PrevReportForm", filteredReport);
        }
    }
}