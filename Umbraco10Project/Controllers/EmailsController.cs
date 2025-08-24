//using Azure.Core;

using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Security;
using System.Text.RegularExpressions;
using GoogleReCaptcha.V3.Interface;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco10Project.Models;
using Umbraco10Project.Services;

namespace Umbraco10Project.Controllers
{
    [IgnoreAntiforgeryToken]
    public class EmailsController : SurfaceController
    {
        private readonly ServicesController ServicesController;
        private readonly IConfiguration _configure;
        private readonly BackgroundTaskManager _backgroundTaskManager;
        private readonly NafathService nafathService;
        private readonly CrmService crmService;

        public EmailsController(
            IUmbracoContextAccessor umbracoContextAccessor,
            IUmbracoDatabaseFactory databaseFactory,
            ServiceContext services,
            AppCaches appCaches,
            IProfilingLogger profilingLogger,
            IPublishedUrlProvider publishedUrlProvider,
            IConfiguration configuration,
            BackgroundTaskManager backgroundTaskManager,
            NafathService nafathService
        )
            : base(
                umbracoContextAccessor,
                databaseFactory,
                services,
                appCaches,
                profilingLogger,
                publishedUrlProvider
            )
        {
            _configure = configuration;
            _backgroundTaskManager = backgroundTaskManager;
            this.nafathService = nafathService;
            ServicesController = new ServicesController(
                umbracoContextAccessor,
                databaseFactory,
                services,
                appCaches,
                profilingLogger,
                publishedUrlProvider
            );
            ServicesController.SetSmtpCommonConfig(2561);
            crmService = new CrmService(
                _configure["variabels:CrmApiEndpoint"] ?? string.Empty,
                _configure["variabels:CrmClientId"] ?? string.Empty,
                _configure["variabels:CrmClientSecret"] ?? string.Empty
            );
        }

        public IActionResult ReviewReport(string? id)
        {
            var regexTemplate = "^[0-9]{10}$";
            if (id != null && !Regex.IsMatch(id, regexTemplate))
            {
                // return error
                Log.Error(
                    "NAFATH Login Request, Invalid id format, please make sure to enter a valid id: "
                        + id
                );
                return BadRequest(
                    new { message = "Invalid id format, please make sure to enter a valid id" }
                );
            }

            try
            {
                var data = new LoginNafath()
                {
                    Action = "SpRequest",
                    Parameters = new RequestParameters() { service = "AdvancedLogin", id = id },
                };
                // store in session
                var response = nafathService.Login(data);
                var newObject = new
                {
                    response, // This includes the response object
                    id // Add the id property
                    ,
                };
                HttpContext.Session.SetString(
                    "nafathLoginRequest",
                    JsonConvert.SerializeObject(newObject)
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                var message = ex.ToString();
                // write the error to console
                Log.Error(message);
                throw new Exception("Error while trying to login to NAFATH");
            }
        }

        [HttpGet]
        public IActionResult SetToken()
        {
            try
            {
                // get from response from session
                var nafathResponse = HttpContext.Session.GetString("nafathLoginRequest");
                if (string.IsNullOrWhiteSpace(nafathResponse))
                    return BadRequest(new { message = "Invalid request" });

                var parsedNafathResponse = JObject.Parse(nafathResponse);
                var response = parsedNafathResponse["response"];
                if (response == null)
                    return BadRequest(new { message = "Invalid request" });

                var transId = response["transId"].ToString();
                var randomValue = response["random"].ToString();
                var idValue = parsedNafathResponse.Value<string>("id");
                if (
                    string.IsNullOrWhiteSpace(transId)
                    || string.IsNullOrWhiteSpace(randomValue)
                    || string.IsNullOrWhiteSpace(idValue)
                )
                    return BadRequest(new { message = "Invalid request" });

                var data = new LoginNafath()
                {
                    Action = "CheckSpRequest",
                    Parameters = new RequestParameters()
                    {
                        transId = transId,
                        random = randomValue,
                        id = idValue,
                    },
                };

                JObject jres = JObject.Parse(nafathService.Check(data));
                string accessToken = jres.Value<string>("accessToken");
                if (accessToken != null)
                {
                    try
                    {
                        ServicePointManager.ServerCertificateValidationCallback = delegate
                        {
                            return true;
                        };
                        ServicePointManager.ServerCertificateValidationCallback += (
                            sender,
                            Certificate,
                            chain,
                            SslPolicyErrors
                        ) => true;

                        var userInfoResponse = nafathService.GetUserInfo(accessToken);
                        var jwtHandler = new JwtSecurityTokenHandler();
                        var jsonToken = jwtHandler.ReadToken(userInfoResponse);
                        var tokenS = jsonToken as JwtSecurityToken;

                        if (tokenS != null)
                        {
                            var user_info = tokenS
                                .Claims.FirstOrDefault(x => x.Type == "user_info")
                                .Value;
                            JObject userInfoJson = JObject.Parse(user_info);
                            string name = userInfoJson.Value<string>("two_names#en");
                            string idNumber = userInfoJson.Value<string>("id");
                            HttpContext.Session.SetString("userNationalId", idNumber);
                            HttpContext.Session.SetString("fullName", name);
                            HttpContext.Session.SetString("accessToken", accessToken);
                        }
                    }
                    catch (Exception ex)
                    {
                        var msg = ex.InnerException;
                        Console.Error.Write(msg);
                    }
                }

                string? status = jres.Value<string>("status");

                return Ok(new { status });
            }
            catch (Exception ex)
            {
                var message = ex.ToString();
                Log.Error(message);
            }

            return Ok(new { status = "COMPLETED" });
        }

        [HttpPost]
        public async Task<ActionResult> Complaint([FromForm] ComplaintModels obj)
        {
            var umbNode = UmbracoContext.Content.GetById(2572)?.Url();
            var umbFalseNode = UmbracoContext.Content.GetById(2747)?.Url();
            umbNode = IsArabicEncode(umbNode);
            umbFalseNode = IsArabicEncode(umbFalseNode);
            var idNumber = HttpContext.Session.GetString("userNationalId");
            if (string.IsNullOrWhiteSpace(idNumber))
                return Redirect(umbFalseNode);

            obj.IdNumber = idNumber;

            if (!ModelState.IsValid)
            {
                // print all errors
                // Log errors or print them to the console
                foreach (var modelStateKey in ModelState.Keys)
                {
                    var modelStateVal = ModelState[modelStateKey];
                    foreach (var error in modelStateVal.Errors)
                        Log.Error($"{modelStateKey}: {error.ErrorMessage}");
                }

                return Redirect(umbFalseNode);
            }

            try
            {
                string SendMessagesApi = _configure["variabels:SendMessagesApi"];
                string TokenCode = _configure["variabels:TokenCode"];

                var userinfo = new
                {
                    nid = obj.IdNumber,
                    firstName = obj.FirstName,
                    lastName = obj.LastName,
                    mobile = obj.Phone,
                    email = obj.Email,
                };

                var content = crmService.AddUser(userinfo);

                if (content == "\"INSERTED\"" || content == "\"UPDATED\"")
                {
                    // var createRequestURL = new RestClient(AddNewReportApi);
                    // createRequestURL.Timeout = -1;

                    // var createRequest = new RestRequest(Method.Post);
                    var files = new List<Files>();
                    using (var form = new MultipartFormDataContent())
                    {
                        foreach (var file in obj.Attachments)
                        {
                            byte[] mydata;

                            await using (Stream inputStream = file.OpenReadStream())
                            {
                                MemoryStream? ms = inputStream as MemoryStream;
                                if (ms == null)
                                {
                                    ms = new MemoryStream();
                                    await inputStream.CopyToAsync(ms);
                                }

                                mydata = ms.ToArray();
                            }

                            files.Add(
                                new Files()
                                {
                                    ByteFile = mydata,
                                    FileName = file.FileName,
                                    ContentType = file.ContentType,
                                }
                            );
                        }
                    }

                    var response = crmService.AddNewReport(obj, files);

                    var pattern = "\"(.*?)\"";
                    Match match = Regex.Match(response, pattern);
                    var extractedData = match.Groups[1].Value;
                    TempData["Case_Number"] = extractedData;
                    var emailObj = new EmailModel();
                    var data =
                        ""
                        + "<p><b>Full Name:</b> '"
                        + obj.FullName
                        + "'</p>"
                        + "<p><b>Id Number:</b> '"
                        + obj.IdNumber
                        + "'</p>"
                        + "<p><b>Phone:</b> '"
                        + obj.Phone
                        + "'</p>"
                        + "<p><b>Email:</b> '"
                        + obj.Email
                        + "'</p>"
                        +
                        // "<p><b>Country:</b> '" + obj.Country + "'</p>" +
                        "<p><b>Region:</b> '"
                        + obj.Region
                        + "'</p>"
                        + "<p><b>City:</b> '"
                        + obj.City
                        + "'</p>"
                        + "<p><b>Reported Name:</b> '"
                        + obj.ReportedName
                        + "'</p>"
                        + "<p><b>Reported Number:</b> '"
                        + obj.ReportedNumber
                        + "'</p>"
                        + "<p><b>Type Of Report:</b> '"
                        + obj.TypeOfReport
                        + "'</p>"
                        + "<p><b>Type Of Reported:</b> '"
                        + obj.TypeOfReported
                        + "'</p>"
                        + "<p><b>Report Classification:</b> '"
                        + obj.ReportClassification
                        + "'</p>"
                        + "<p><b>Type Of Reported:</b> '"
                        + obj.TypeOfReported
                        + "'</p>"
                        + "<p><b>Report Description:</b> '"
                        + obj.ReportDescription
                        + "'</p>"
                        + "<p><b>Platform Link:</b> '"
                        + obj.PlatformLink
                        + "'</p>";

                    emailObj.EmailBody = "<div>" + emailObj.EmailBody + "</br>" + data + " </div>";

                    emailObj.AttachedFiles = obj.Attachments;
                    // avoid sending emails to internal employees
                    // ServicesController.SendEmail(EmailObj);

                    var messageText =
                        " شريكنا العزيز ،\n تم إنشاء بلاغ رقم("
                        + extractedData
                        + ") بنجاح بلاغكم محل اهتمامنا";
                    var client = new HttpClient();
                    var request = new HttpRequestMessage(
                        HttpMethod.Post,
                        $"{SendMessagesApi}?_senderName=Rega&_messageText={messageText}&_recipients={obj.Phone}"
                    );
                    request.Headers.Add("Authorization", TokenCode);
                    ServicePointManager.ServerCertificateValidationCallback =
                        new RemoteCertificateValidationCallback(
                            delegate
                            {
                                return true;
                            }
                        );

                    var msResponse = await client.SendAsync(request);
                    msResponse.EnsureSuccessStatusCode();

                    return Redirect(umbNode);
                }
            }
            catch (Exception ex)
            {
                var mmsg = ex.Message;
                Log.Error(mmsg);
                return Redirect(umbFalseNode);
            }

            return Redirect(umbFalseNode);
        }

        public ActionResult PrevReports(bool isEnglish, int check = 0)
        {
            if (check == 1)
            {
                bool shouldRedirectToPreviousReportPage =
                    HttpContext.Session.GetString("shouldRedirectToPreviousReportPage") == "true"
                        ? true
                        : false;
                if (shouldRedirectToPreviousReportPage)
                {
                    HttpContext.Session.SetString("shouldRedirectToPreviousReportPage", "false");
                    // redirect to previous report page
                    var prevReport = UmbracoContext.Content.GetById(2649)?.Url("ar-JO");
                    prevReport = "/" + WebUtility.UrlEncode(prevReport);
                    return Ok(prevReport);
                }

                return Ok("");
            }

            var umbFalseNode = "";

            umbFalseNode = isEnglish
                ? UmbracoContext.Content.GetById(2649)?.Url()
                : UmbracoContext.Content.GetById(2649)?.Url("ar-JO");
            ;
            if (!isEnglish)
            {
                umbFalseNode = "/" + WebUtility.UrlEncode(umbFalseNode);
            }

            return Ok(umbFalseNode);
        }

        public ActionResult PrevReportFormItem(string serialNumber, bool isEnglish)
        {
            var umbFalseNode = "";

            umbFalseNode = isEnglish
                ? UmbracoContext.Content.GetById(2627)?.Url()
                : UmbracoContext.Content.GetById(2627)?.Url("ar-JO");
            ;
            if (!isEnglish)
            {
                umbFalseNode = "/" + WebUtility.UrlEncode(umbFalseNode);
            }

            //umbFalseNode = IsArabicEncode(umbFalseNode);
            //TempData["serialNumber"] = serialNumber;
            HttpContext.Session.SetString("serialNumber", serialNumber);

            return Ok(umbFalseNode);
        }

        public ActionResult PrevReportForm([FromForm] Report obj)
        {
            var umbNode = UmbracoContext.Content.GetById(3194)?.Url();
            var umbFalseNode = UmbracoContext.Content.GetById(2747)?.Url();
            umbNode = IsArabicEncode(umbNode);
            umbFalseNode = IsArabicEncode(umbFalseNode);
            var idNumber = HttpContext.Session.GetString("userNationalId");
            if (string.IsNullOrWhiteSpace(idNumber))
                return Redirect(umbFalseNode);
            obj.nid = idNumber;

            try
            {
                var files = new List<Files>();

                using (var form = new MultipartFormDataContent())
                {
                    foreach (IFormFile file in obj.files)
                    {
                        {
                            byte[] mydata;
                            using (Stream inputStream = file.OpenReadStream())
                            {
                                MemoryStream? ms = inputStream as MemoryStream;
                                if (ms == null)
                                {
                                    ms = new MemoryStream();
                                    inputStream.CopyTo(ms);
                                }

                                mydata = ms.ToArray();
                            }

                            files.Add(
                                new Files()
                                {
                                    ByteFile = mydata,
                                    FileName = file.FileName,
                                    ContentType = file.ContentType,
                                }
                            );
                        }
                    }
                }

                return Redirect(umbNode);
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                Log.Error(msg);

                return Redirect(umbFalseNode);
            }
        }

        [HttpGet]
        public IActionResult GetTypeOfReported(string value)
        {
            var model = new ComplaintModels();

            var reportOffenderResponse = crmService.GetReportOffender(value);
            model.TypeOfReportedList = JsonConvert.DeserializeObject<List<getData>>(
                reportOffenderResponse
            );
            return Ok(model.TypeOfReportedList);
        }

        [HttpGet]
        public IActionResult GetReportClassification(string value)
        {
            var model = new ComplaintModels();
            var reportClassificationResponse = crmService.GetReportClassification(value);
            model.ReportClassificationList = JsonConvert.DeserializeObject<List<getData>>(
                reportClassificationResponse
            );

            return Ok(model.ReportClassificationList);
        }

        [HttpPost]
        public ActionResult Report([FromForm] ReportModel obj)
        {
            if (!ModelState.IsValid)
            {
                var umbFalseNode = UmbracoContext.Content.GetById(2747)?.Url();
                umbFalseNode = IsArabicEncode(umbFalseNode);
                // print all errors
                // Log errors or print them to the console
                foreach (var modelStateKey in ModelState.Keys)
                {
                    var modelStateVal = ModelState[modelStateKey];
                    foreach (var error in modelStateVal.Errors)
                    {
                        Log.Error($"{modelStateKey}: {error.ErrorMessage}");
                    }
                }

                return Redirect(umbFalseNode);
            }

            var umbNode = UmbracoContext.Content.GetById(2572)?.Url();
            umbNode = IsArabicEncode(umbNode);
            EmailModel EmailObj = new EmailModel();

            var data =
                ""
                + "<p><b>Full Name:</b> '"
                + obj.FullName
                + "'</p>"
                + "<p><b>Id Number:</b> '"
                + obj.IdNumber
                + "'</p>"
                + "<p><b>Phone:</b> '"
                + obj.Phone
                + "'</p>"
                + "<p><b>Email:</b> '"
                + obj.Email
                + "'</p>"
                + "<p><b>Country:</b> '"
                + obj.Country
                + "'</p>"
                + "<p><b>Region:</b> '"
                + obj.Region
                + "'</p>"
                + "<p><b>City:</b> '"
                + obj.City
                + "'</p>"
                + "<p><b>Reported Name:</b> '"
                + obj.ReportedName
                + "'</p>"
                + "<p><b>Reported Number:</b> '"
                + obj.ReportedNumber
                + "'</p>"
                + "<p><b>Type Of Report:</b> '"
                + obj.TypeOfReport
                + "'</p>"
                + "<p><b>Type Of Reported:</b> '"
                + obj.TypeOfReported
                + "'</p>"
                + "<p><b>Report Classification:</b> '"
                + obj.ReportClassification
                + "'</p>"
                + "<p><b>Type Of Reported:</b> '"
                + obj.TypeOfReported
                + "'</p>"
                + "<p><b>Report Description:</b> '"
                + obj.ReportDescription
                + "'</p>"
                + "<p><b>Platform Link:</b> '"
                + obj.PlatformLink
                + "'</p>";

            EmailObj.EmailBody = "<div>" + EmailObj.EmailBody + "</br>" + data + " </div>";

            if (obj.Attachment != null)
            {
                EmailObj.AttachedFiles = obj.Attachment;
            }

            // var sendingEmail = ServicesController.SendEmail(EmailObj);
            _backgroundTaskManager.RunBackgroundTask(EmailObj, ServicesController);

            return Redirect(umbNode);
        }

        public string IsArabicEncode(string path)
        {
            var umbNode = path;
            if (!string.IsNullOrWhiteSpace(path))
            {
                if (!path.Contains("/en/"))
                {
                    umbNode = "/" + WebUtility.UrlEncode(umbNode);
                }
            }

            return umbNode;
        }
    }
}
