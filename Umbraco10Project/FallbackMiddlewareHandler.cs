using System.Text.RegularExpressions;
using Umbraco.Cms.Core.Web;

namespace Umbraco10Project;

public class FallbackMiddlewareHandler(RequestDelegate next)
{
    public async Task Invoke(HttpContext context, IUmbracoContextFactory umbracoContextFactory)
    {
        // Check if the URL matches /media-center/complaints/*
        if (
            Regex.IsMatch(context.Request.Path, "^/media-center/complaints/.*")
            && !context.Request.Path.Equals(
                "/media-center/complaints/",
                StringComparison.OrdinalIgnoreCase
            )
        )
        {
            // Redirect to /media-center/complaints/ only if the path is different
            context.Response.Redirect("/media-center/complaints/", true);
            return;
        }

        // If no redirection is needed, continue with the next middleware
        await next(context);
    }
}
