using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using System.IO;
using MimeDetective;
using Umbraco10Project.Models;

namespace Umbraco10Project.Controllers;
public class FileValidationController : SurfaceController
{
    public FileValidationController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider)
        : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
    }

    [HttpPost]
    public async Task<IActionResult> Validate(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return Ok(new ResponseStatus { code = 1, message = "File is required." });
        }

        try
        {
            // Step 1: Validate MIME type using magic numbers
            using (var stream = file.OpenReadStream())
            {
                var inspector = new ContentInspectorBuilder()
                {
                    Definitions = MimeDetective.Definitions.Default.All()
                }.Build();

                var results = inspector.Inspect(stream);
                var mimeType = results.ByMimeType().FirstOrDefault()?.MimeType;

                if (mimeType == null)
                {
                    return Ok(new ResponseStatus { code = 1, message = "Unable to determine file type." });
                }

                var allowedMimeTypes = new[] { "image/jpeg", "image/png", "application/pdf" };
                if (!allowedMimeTypes.Contains(mimeType))
                {
                    return Ok(new ResponseStatus { code = 1, message = "Invalid file content type." });
                }
            }

            // File is valid
            return Ok(new ResponseStatus { code = 0, message = "Success." });
        }
        catch (Exception ex)
        {
            // Log the exception (if logging is implemented)
            return Ok(new ResponseStatus { code = 1, message = "An error occurred during validation." });
        }
    }
}