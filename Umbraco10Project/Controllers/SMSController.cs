using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Net;
using System.Dynamic;
using Umbraco10Project.Models;

namespace Umbraco10Project.Controllers
{
    // FWFA Forms WorkFlow Action 
    [ApiController]
    [Route("[controller]")]
    public class FWFAController : ControllerBase
    {
        private readonly ILogger<FWFAController> _logger;
        private readonly IConfiguration _configure;

        public FWFAController(ILogger<FWFAController> logger, IConfiguration configure)
        {
            _logger = logger;
            _configure = configure;
        }

        [HttpPost]
        [Route("SendSMS")]
        public async Task<bool> SendSMSAsync()
        {
            dynamic obj = new ExpandoObject();
            var objforms = HttpContext?.Request?.Form;
            if (objforms == null) return false;
            obj.FormId = objforms["FormId"];
            obj.FormName = objforms["FormName"];
            obj.PageUrl = objforms["PageUrl"];
            obj.SubmissionDate = objforms["SubmissionDate"];
            obj.Email = objforms["Email"];
            obj.Mobile = objforms["Mobile"];
            obj.VisitDate = objforms["VisitDate"];
            obj.VisitTime = objforms["VisitTime"];


            CultureInfo arabicCulture = new CultureInfo("ar-SA");
            var VisitDate = DateTime.Parse(obj.VisitDate);
            string dayName = arabicCulture.DateTimeFormat.GetDayName(VisitDate.DayOfWeek);
            var _messageText =
                "عزيزي المستفيد نشكر تواصلكم مع برامج الهيئة العامة للعقار ونفيدكم بإتمام حجز موعدكم يوم "
                + dayName
                + " بتاريخ "
                + VisitDate.Year + "-" + VisitDate.Month + "-" + VisitDate.Day +
                " الساعة " + obj.VisitTime + " نسعد بخدمتكم";

            var client = new HttpClient();
            var tokenCode = _configure["variabels:TokenCode"] ?? "";
            var SendMessagesApi = _configure["variabels:SendMessagesApi"] ?? "";
            _logger.LogError(tokenCode);
            var request = new HttpRequestMessage(HttpMethod.Post,
                $"{SendMessagesApi}?_senderName=Rega&_messageText={_messageText}&_recipients={obj.Mobile}");
            request.Headers.Add("Authorization", tokenCode);

            ServicePointManager.ServerCertificateValidationCallback =
                delegate { return true; };

            var msResponse = await client.SendAsync(request);
            msResponse.EnsureSuccessStatusCode();
            var msRescontent = await msResponse.Content.ReadAsStringAsync();
            return true;

        }
    }
}