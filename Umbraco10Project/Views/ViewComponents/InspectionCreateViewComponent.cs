using System.Collections;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.UmbracoContext;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
using uSync.Core;

namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "InspectionCreate")]
public class InspectionCreateViewComponent(
    IConfiguration configuration,
    IHttpContextAccessor httpContextAccessor,
    IUmbracoContextFactory context,
    ILogger<InspectionCreateViewComponent> logger,
    InspectionService inspectionService
) : ViewComponent
{
    private readonly IUmbracoContext _umbracoContext;

    private static readonly string ManifestFilePath = Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot",
        "inspection-form",
        "manifest.json"
    );

    public IViewComponentResult Invoke()
    {
        var nationalId = HttpContext.Session.GetString("userNationalId");
        var fullName = HttpContext.Session.GetString("fullName");

        if (nationalId == null || fullName == null)
        {
            using (var cref = context.EnsureUmbracoContext())
            {
                //use context here
                var arabicPage = cref.UmbracoContext.Content.GetById(2624).Url("ar-JO");
                arabicPage = WebUtility.UrlEncode(arabicPage);
                arabicPage = "/" + arabicPage;
                httpContextAccessor.HttpContext.Response.Redirect(arabicPage);
                return View(
                    "InspectionError",
                    new GenericApiResponse<InspectionModel>
                    {
                        ShouldRedirect = true,
                        Success = false,
                    }
                );
            }
        }

        try
        {
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

            var formModel = inspectionService.GetForm();
            var filteredSections = new ArrayList();
            foreach (var section in formModel.Data.Fields)
            {
                if (section.ArLabel == "المستندات الناقصة")
                {
                    continue;
                }

                if (section.VisibilityView.Count > 0)
                {
                    continue;
                }

                filteredSections.Add(section);
            }

            formModel.Data.Fields = filteredSections.Cast<Field>().ToList();
            formModel.JsFile = data.GetValueAs<string>();
            formModel.IdNumber = nationalId;
            formModel.FullName = fullName;

            // Pass the deserialized data to the view
            return View("InspectionCreate", formModel);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error while reading manifest file");
            return View(
                "InspectionError",
                new GenericApiResponse<InspectionModel> { ShouldRedirect = false, Success = false }
            );
        }
    }
}
