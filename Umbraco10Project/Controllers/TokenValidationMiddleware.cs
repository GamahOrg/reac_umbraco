using System.Net;
using FuzzySharp;
using Serilog;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using uSync.Core;

namespace Umbraco10Project.Controllers
{
    public class TokenValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IContentService _contentService; // Umbraco content service
        private HttpContext _httpContext;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public TokenValidationMiddleware(RequestDelegate next, IServiceProvider serviceProvider,
            IConfiguration configuration, IWebHostEnvironment env)
        {
            _next = next;
            _contentService = serviceProvider.GetRequiredService<IContentService>();
            _configuration = configuration;
            _env = env;
        }

        public async Task Invoke(HttpContext context, IUmbracoContextFactory umbracoContextFactory)
        {
            string token = context.Session.GetString("accessToken");
            _httpContext = context;

            var path = context.Request.Path;
            string decodedUrl = WebUtility.UrlDecode(path);
            if (IsPageProtected(decodedUrl))
            {
                // Validate the token
                if (await TokenIsValid(context, token))
                {
                    await _next(context); // Continue to the requested page
                }
                else
                {
                    if (!decodedUrl.IsNullOrWhiteSpace())
                    {
                        if (decodedUrl.Contains("/en/"))
                        {
                            context.Response.StatusCode = 401;
                        }
                        else
                        {
                            context.Response.StatusCode = 402;
                        }
                    }
                }
            }
            else
            {
                if (decodedUrl.Contains("/umbraco"))
                {
                    if (decodedUrl.Contains("umbraco/surface") || decodedUrl.Contains("umbraco/api"))
                    {
                        await _next(context);
                    }
                    // if X-Original-Forwarded-For is not null, then the request is coming from a load balancer
                    // which means we need to prevent access to the backoffice from the outside world
                    // and only allow access from the load balancer
                    //context.Request.Headers.FirstOrDefault(x => x.Key == "X-Original-Forwarded-For").Value == {}

                    // log the type of context.Request.Headers.FirstOrDefault(x => x.Key == "X-Original-Forwarded-For").Value
                    else if (context.Request.Headers.FindIndex(x => x.Key == "X-Original-Forwarded-For") != -1)
                    {
                        // respond with html saying that the backoffice is not accessible from the outside world
                        context.Response.ContentType = "text/html";
                        await context.Response.WriteAsync(
                            "<h1>Backoffice is not accessible from the outside world</h1>");
                    }
                    else
                    {
                        await _next(context);
                    }
                }
                // CRM/NewReportCase
                else if (decodedUrl.Contains("/CRM/NewReportCase"))
                {
                    // redirect to
                    // append in the session that the user want to go to previous report page
                    context.Session.SetString("shouldRedirectToPreviousReportPage", "true");
                    context.Response.Redirect("/%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D8%A7%D9%85%D9%8A/%D8%A8%D9%88%D8%A7%D8%A8%D8%A9-%D9%86%D9%81%D8%A7%D8%B0/");
                }
                else if (decodedUrl.Contains("/News/NewsDetails"))
                {
                    var id = context.Request.Query["id"].ToString();
                    // current directory
                    string currentDirectory = Directory.GetCurrentDirectory();
                    string filePath = Path.Combine(currentDirectory, "old-news.csv");
                    var resultHashMap = ReadCsvToHashMap(filePath);
                    var oldNewsTitle = "";
                    // Example usage:
                    foreach (var kvp in resultHashMap)
                    {
                        if (kvp.Value == id)
                        {
                            oldNewsTitle = kvp.Key;
                            break;
                        }
                    }

                    using (var contextReference = umbracoContextFactory.EnsureUmbracoContext())
                    {
                        var umbracoContext = contextReference.UmbracoContext;

                        var currentNode = umbracoContext.Content?.GetById(1272);
                        if (currentNode != null)
                        {
                            var children = currentNode.ChildrenForAllCultures.ToList();
                            foreach (var child in children)
                            {
                                var childId = child.Id;
                                if (childId == 1273)
                                {
                                    var news = child.ChildrenForAllCultures.ToList();
                                    foreach (var item in news)
                                    {
                                        if (item.Name == oldNewsTitle)
                                        {
                                            var baseurl =
                                                "%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D8%A7%D9%85%D9%8A/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/";
                                            var encodedUrl = WebUtility.UrlEncode(item.UrlSegment);
                                            Log.Information("Found {oldNewsTitle} in the news list via exact search", oldNewsTitle);
                                            context.Response.Redirect($"/{baseurl}{encodedUrl}/?page=1&search=&sort=");
                                            return;
                                        }

                                    }
                                    foreach (var item in news)
                                    {
                                        if (Fuzz.Ratio(item.Name, oldNewsTitle) > 90)
                                        {
                                            var baseurl =
                                                "%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D8%A7%D9%85%D9%8A/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/";
                                            var encodedUrl = WebUtility.UrlEncode(item.UrlSegment);
                                            Log.Information("Found {oldNewsTitle} in the news list via fuzzy search", oldNewsTitle);
                                            context.Response.Redirect($"/{baseurl}{encodedUrl}/?page=1&search=&sort=");
                                            return;
                                        }
                                    }
                                    Log.Warning("Failed to find {oldNewsTitle} in the news list", oldNewsTitle);
                                    // redirect to the news page if the news is not found
                                    context.Response.Redirect(
                                        "/%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%A7%D8%B9%D9%84%D8%A7%D9%85%D9%8A/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1/?page=1&search=&sort=");

                                }
                            }
                        }
                    }
                }
                else
                {
                    await _next(context); // Page is not protected, continue to the requested page
                }
            }
        }

        private bool IsPageProtected(string path)
        {
            IContent mainSettings = _contentService.GetById(1189);
            List<string> protectedPaths = new List<string>();

            if (mainSettings != null)
            {
                var pagesToprotect = mainSettings.Properties.TryGetValue("pagesToProtect", out IProperty prop);

                string values = prop.Values.First().PublishedValue.ToString();


                protectedPaths = values.Split(",").ToList();
                string decodedUrl = WebUtility.UrlDecode(path);
                if (protectedPaths.Contains(decodedUrl))
                {
                    return true;
                }
            }

            // Add logic to determine if the page is protected based on its URL or content node
            // You may store this information in a configuration or database.
            return false; // Example: All pages are protected
        }

        private async Task<bool> TokenIsValid(HttpContext context, string token)
        {
            // Add logic to validate the token here

            if (token == null)
            {
                return false;
            }

            return true;
        }

        static Dictionary<string, string> ReadCsvToHashMap(string filePath)
        {
            Dictionary<string, string> resultMap = new Dictionary<string, string>();

            try
            {
                using (var reader = new StreamReader(filePath))
                {
                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        var values = line.Split(',');

                        if (values.Length >= 2)
                        {
                            string id = values[1].Trim(); // Assuming Id is at index 1
                            string text = values[0].Trim(); // Assuming Text is at index 0

                            resultMap[id] = text;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading CSV file: {ex.Message}");
            }

            return resultMap;
        }
    }
}