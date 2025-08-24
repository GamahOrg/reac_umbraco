using System.Net.Mail;
using NewsletterStudio.Core.Models.System;
using NewsletterStudio.Core.Sending.Providers;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco10Project.Models;

namespace Umbraco10Project.Controllers;

public class ExchangeEmailServiceProvider : IEmailServiceProvider
{
    public const string ProviderAlias = "exchange";
    public string Alias => ProviderAlias;
    public string DisplayName => "Excahnge";
    public string SettingsView => "/App_Plugins/regaPlugins/exchange/exchange.settings.html";
    private readonly ServicesController _servicesController;

    public ExchangeEmailServiceProvider(IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services, AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider)
    {
        _servicesController = new ServicesController(umbracoContextAccessor, databaseFactory, services, appCaches,
            profilingLogger, publishedUrlProvider);
        _servicesController.SetSmtpCommonConfig(2561);
    }

    public Dictionary<string, object> Settings { get; set; }

    public SendOutConfiguration GetSendOutConfiguration()
    {
        return new SendOutConfiguration()
        {
            MaxItemsPerBatch = 25,
            SendBatchSize = 25
        };
    }

    public ValidationErrorCollection ValidateSettings(Dictionary<string, object> settings)
    {
        var errors = new ValidationErrorCollection();

        return errors;
    }

    public void Send(List<SendEmailJob> batch)
    {
        if (batch.Count > 50)
            throw new ArgumentException("Can't send more than 50 emails per batch with Mailjet.");


        foreach (var message in batch)
        {
            var emailObj = new EmailModel();
            
            emailObj.EmailBody = message.Message.Body;
            emailObj.EmailSubject = message.Message.Subject;
            emailObj.RecieversTOEmails = String.Join(", ", message.Message.To);
            emailObj.RecieversCCEmails = String.Join(", ", message.Message.CC);
            var emailResponse = _servicesController.SendEmail(emailObj);
            var emailResponseResult = (ResponseStatus)(emailResponse.Value ?? new ResponseStatus());

            if (emailResponseResult.code == 0)
            {
                message.Successful = true;
            }
            else
            {
                message.Successful = false;
                message.ErrorMessage = emailResponseResult.message;
            }
        }
    }


    public CommandResult Send(MailMessage message)
    {
        var fakeBulk = new List<SendEmailJob>();
        fakeBulk.Add(new SendEmailJob()
        {
            Message = message
        });

        Send(fakeBulk);

        var res = fakeBulk.First();

        if (res.Successful)
            return CommandResult.Successful();

        return CommandResult.Error(new ValidationError("", "", res.ErrorMessage));
    }
}