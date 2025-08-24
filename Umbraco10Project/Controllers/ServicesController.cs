using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco10Project.Models;
using System.Net;
using MailKit.Security;
using Serilog;

namespace Umbraco10Project.Controllers
{
    public class ServicesController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider)
        : SurfaceController(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger,
            publishedUrlProvider)
    {
        private readonly SMTPModel _emailConfig = new();
        public void SetSmtpCommonConfig(int instanceId)
        {
            var mainInstance = UmbracoContext.Content.GetById(instanceId);
            IPublishedContent selectedSMTPConfig = mainInstance.Value<IPublishedContent>("sMTPConfig");
            var smptpInstance = UmbracoContext.Content.GetById(selectedSMTPConfig.Id);
            _emailConfig.SenderEmail = smptpInstance.Value<string>("senderEmail");
            _emailConfig.SenderPassword = smptpInstance.Value<string>("senderEmailPassword");
            _emailConfig.PortNo = smptpInstance.Value<int>("portNumberSMTP");
            _emailConfig.HostName = smptpInstance.Value<string>("hostName");
            _emailConfig.EnableSSL = smptpInstance.Value<bool>("enableSSL");
            _emailConfig.UseDefaultCredentials = smptpInstance.Value<bool>("useDefaultCredentials");
            _emailConfig.EmailSubject = mainInstance.Value<string>("emailSubject");
            _emailConfig.EmailBody = mainInstance.Value<string>("emailBody");
            _emailConfig.SucessMessageTitle = mainInstance.Value<string>("messageTitle");
            _emailConfig.SucessMessage = mainInstance.Value<string>("messageBody");
            //var recieversCCEmails = mainInstance.GetProperty("receiversEmailsCC").Value<IEnumerable<string>>();
            //var recieversTOEmails = mainInstance.GetProperty("receiversEmailsTO").Value<IEnumerable<string>>();

            // var recieversCCEmails = mainInstance.Value<IEnumerable<string>>("receiversEmailsCC");
            // var recieversTOEmails = mainInstance.Value<IEnumerable<string>>("receiverEmailsTo");
            //
            //
            // emailConfig.RecieversTOEmails = string.Join(",", recieversTOEmails);
            // emailConfig.RecieversCCEmails = string.Join(",", recieversCCEmails);

        }

        [HttpPost]
        public OkObjectResult SendEmail(EmailModel mailModel)
        {
            //HttpContext.Session.SetString("formInfo", "");
            //if (Session["UniqueUser"] == null)
            //    return new HttpStatusCodeResult(HttpStatusCode.Forbidden, "Untrusted Action!");

            //if (EmailConfig == null)
            //	return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "EmailConfig can't be null!");

            //if (EmailConfig.RecieversTOEmails == null || EmailConfig.HostName == null || EmailConfig.SenderEmail == null || EmailConfig.SenderPassword == null || EmailConfig.PortNo == 0)
            //	return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "RecieversTOEmails or HostName or Sender Email or Sender Password or Port No cannot be null");

            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress(_emailConfig.SenderEmail, _emailConfig.SenderEmail);
            message.From.Add(from);
            message.Subject = mailModel.EmailSubject;


            foreach (var reciverToEmail in mailModel.RecieversTOEmails.Split(','))
            {
                message.To.Add(new MailboxAddress(reciverToEmail, reciverToEmail));
            }


            if (mailModel.RecieversCCEmails != "")
            {
                foreach (var reciverCcEmail in mailModel.RecieversCCEmails.ToString().Split(','))
                {
                    message.Cc.Add(new MailboxAddress(reciverCcEmail, reciverCcEmail));
                }
            }

            BodyBuilder bodyBuilder = new BodyBuilder();

            try
            {
                bodyBuilder.HtmlBody = mailModel.EmailBody;
                foreach (var attachment in mailModel.AttachedFiles)
                {
                    using var memoryStream = new MemoryStream();
                    attachment.CopyTo(memoryStream);
                    var fileBytes = memoryStream.ToArray();
                    bodyBuilder.Attachments.Add(attachment.FileName, fileBytes);
                }

                message.Body = bodyBuilder.ToMessageBody();
            }
            catch (Exception ex)
            {
                string e = ex.Message;
            }

            MailKit.Net.Smtp.SmtpClient client = new MailKit.Net.Smtp.SmtpClient();
            client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            client.Connect(
                _emailConfig.HostName,
                _emailConfig.PortNo,
                SecureSocketOptions.StartTls); //25 or same port with true
            client.Authenticate(_emailConfig.SenderEmail, _emailConfig.SenderPassword);
            client.Send(message);
            Log.Information("Email sent successfully to " + _emailConfig.RecieversTOEmails);
            client.Disconnect(true);
            client.Dispose();
            return Ok(new ResponseStatus() { code = 0, message = "success" });
        }

        public ActionResult LogOut(string language)
        {
            HttpContext.Session.Clear();
            if (language == "arabic")
            {
                var arabicPage = UmbracoContext.Content.GetById(2624).Url("ar-JO");
                arabicPage = WebUtility.UrlEncode(arabicPage);
                arabicPage = "/" + arabicPage;
                return Redirect(arabicPage);
            }

            var englishPage = UmbracoContext.Content.GetById(2624).Url();
            return Redirect(englishPage);
        }

        public ActionResult Back(string language)
        {
            if (language == "arabic")
            {
                // Umbraco.Content(3078).Url()
                var arabicPage = UmbracoContext.Content.GetById(3078).Url("ar-JO");
                arabicPage = WebUtility.UrlEncode(arabicPage);
                arabicPage = "/" + arabicPage;
                return Redirect(arabicPage);
            }

            var englishPage = UmbracoContext.Content.GetById(3078).Url();
            return Redirect(englishPage);
        }
    }
}