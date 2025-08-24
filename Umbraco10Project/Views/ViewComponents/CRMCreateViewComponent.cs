using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Web;
using Umbraco10Project.Models;
using Umbraco10Project.Controllers.Models.SuggestionsInquiriesModels;
using Umbraco10Project.Services;
using uSync.Core;
using Newtonsoft.Json.Linq;

namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "CRMCreate")]
public class CRMCreateViewComponent(
    IConfiguration configuration,
    IHttpContextAccessor httpContextAccessor,
    IUmbracoContextFactory context,
    ILogger<CRMCreateViewComponent> logger,
    SuggestionsInquiriesService suggestionsInquiriesService
) : ViewComponent
{

    private static readonly string ManifestFilePath = Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot",
        "inspection-form",
        "manifest.json"
    );

    public IViewComponentResult Invoke(string modelId)
    {
        var nationalId = HttpContext.Session.GetString("userNationalId");
        var fullName = HttpContext.Session.GetString("fullName");
        var userInfo = HttpContext.Session.GetString("userInfo");

        if (nationalId == null || fullName == null)
        {
            using (var cref = context.EnsureUmbracoContext())
            {
                //use context here
                var arabicPage = cref.UmbracoContext.Content.GetById(2624).Url("ar-JO");
                arabicPage = WebUtility.UrlEncode(arabicPage);
                arabicPage = "/" + arabicPage + "?redirectId="+modelId;
                httpContextAccessor.HttpContext.Response.Redirect(arabicPage);
                return View(
                    "CRMError",
                    new GenericApiResponse<ContactValue>
                    {
                        ShouldRedirect = true,
                        Success = false,
                    }
                );
            }
        }

        try
        {
            // Deserialize the JSON string into a dynamic object
            var userObject = JObject.Parse(userInfo);

            // retry to get the manifest file wait for 1 second
            var maxRetry = 15;
            while (!File.Exists(ManifestFilePath) && maxRetry > 0)
            {
                Thread.Sleep(1000);
                maxRetry--;
            }

            if (!File.Exists(ManifestFilePath))
                throw new Exception("");

            var json = File.ReadAllText(ManifestFilePath);
            if (string.IsNullOrEmpty(json))
                throw new Exception("");
            var manifestData = JsonSerializer.Deserialize<
                Dictionary<string, Dictionary<string, object>>
            >(json);
            // Update "assets/index.js" to the specific key in your manifest
            var data = manifestData?["index.html"]["file"];
            var contactModel = suggestionsInquiriesService.GetContact(nationalId);

            contactModel.JsFile = data.GetValueAs<string>();
            contactModel.IdNumber = nationalId;
            contactModel.FullName = fullName;
            contactModel.Data.first_name = contactModel.Data.first_name ?? userObject["FirstName"]?.ToString();
            contactModel.Data.last_name = contactModel.Data.last_name ?? userObject["LastName"]?.ToString();

            // Pass the deserialized data to the view
            return View("CRMCreate", contactModel);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error while reading manifest file");
            return View(
                "CRMError",
                new GenericApiResponse<ContactValue> { ShouldRedirect = false, Success = false }
            );
        }
    }
}
