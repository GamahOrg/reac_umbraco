using Microsoft.AspNetCore.Mvc;
using NewsletterStudio.Core.Rendering.Tasks;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco10Project.Models;

namespace Umbraco10Project.Controllers
{
    public class SearchController : SurfaceController
    {
        public SearchController(UmbracoHelper umbracoHelper, IUmbracoContextAccessor umbracoContextAccessor,
            IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches,
            IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor,
            databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _umbracoHelper = umbracoHelper;
        }

        private readonly UmbracoHelper _umbracoHelper;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Search(IFormCollection form)
        {
            if (ModelState.IsValid)
            {
                //do search from api or do in search result page
                var searchInput = new Dictionary<string, string>();
                var dynamicInputs = new Dictionary<string, string>();

                foreach (string key in form.Keys)
                {
                    if (key.StartsWith("DynamicInputs["))
                    {
                        var dynamicKey = key.Substring(14, key.Length - 15); // Removes "DynamicInputs[" and the trailing "]"
                        dynamicInputs[dynamicKey] = form[key]; 
                    }
                    else
                    {
                        searchInput[key] = form[key];
                    }
                }

                TempData["DynamicInputs"] = JsonConvert.SerializeObject(dynamicInputs);
                TempData["SearchData"] = JsonConvert.SerializeObject(searchInput);
                var searchroot = _umbracoHelper.Content(searchInput["ResultPageId"]);
                if (searchroot != null && searchroot.Children.FirstOrDefault() != null)
                {
                    return RedirectToUmbracoPage(searchroot.Children.First().Key);
                }
            }


            return CurrentUmbracoPage();
        }
    }
}