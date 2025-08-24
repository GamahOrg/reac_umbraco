using Microsoft.AspNetCore.Mvc;
using NewsletterStudio.Core.Public;
using NewsletterStudio.Core.Public.Models;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco10Project.Models;

namespace Umbraco10Project.Controllers;

public class SubscribeController(
    INewsletterStudioService newsletterStudioService,
    IUmbracoContextAccessor umbracoContextAccessor,
    IUmbracoDatabaseFactory databaseFactory,
    ServiceContext services,
    AppCaches appCaches,
    IConfiguration configuration,
    IProfilingLogger profilingLogger,
    IPublishedUrlProvider publishedUrlProvider)
    : SurfaceController(umbracoContextAccessor,
        databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
{
    [HttpPost]
    public ActionResult Subscribe(SubscribeModel model)
    {
        var resultPage = UmbracoContext.Content.GetById(21383).Url();
        if (!ModelState.IsValid)
        {
            TempData["NewsLetter"] = JsonConvert.SerializeObject(new SubscribeModel()
            {
                status = false,
                message = "Invalid input. Please provide a valid email address"
            });
            return Redirect(resultPage);
        }

        var defaultMailingListKey =
            Guid.Parse(configuration["variabels:NewsLetterMailingListKey"] ?? string.Empty); // Replace with your mailing list key

        var addRecipientRequest = AddRecipientRequest.Create(model.Email)
            .WithSource("Website")
            .SubscribeTo(defaultMailingListKey)
            .Build();

        var result = newsletterStudioService.AddRecipient(addRecipientRequest);

        if (result.Success)
        {
            TempData["NewsLetter"] = JsonConvert.SerializeObject(new SubscribeModel()
            {
                status = true,
                message = "You have been successfully subscribed to our newsletter"
            });
        }
        else
        {
            TempData["NewsLetter"] = JsonConvert.SerializeObject(new SubscribeModel()
            {
                status = false,
                message = result.Message
            });
        }

        return Redirect(resultPage);
    }
}