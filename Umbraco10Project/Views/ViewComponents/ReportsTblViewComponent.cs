using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Umbraco10Project.Services;
using Umbraco10Project.Models;

namespace Umbraco10Project.Views.ViewComponents
{
    [ViewComponent(Name = "ReportsTbl")]
    public class ReportsTblViewComponent : ViewComponent
    {
        private readonly IConfiguration _configure;
        private readonly CrmService crmService;

        public ReportsTblViewComponent(IConfiguration configuration)
        {
            _configure = configuration;
            crmService = new CrmService(_configure["variabels:CrmApiEndpoint"] ?? string.Empty,
                _configure["variabels:CrmClientId"] ?? string.Empty,
                _configure["variabels:CrmClientSecret"] ?? string.Empty);
        }

        public IViewComponentResult Invoke()
        {
            
            List<Report> model = new List<Report>();


            var nationalId = HttpContext.Session.GetString("userNationalId");
            if (nationalId == null)
                return View("PrevReportFormError");


            try
            {
                string content = crmService.GetReportsByContactId(nationalId);
                model = JsonConvert.DeserializeObject<List<Report>>(content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return View("ReportsTbl", model);
        }
    }
}