using System.Net;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Web;
using Umbraco10Project.Models;

namespace Umbraco10Project.Views.ViewComponents;

[ViewComponent(Name = "Form")]
public class FormViewComponent(
    IHttpContextAccessor httpContextAccessor,
    IUmbracoContextFactory context
) : ViewComponent
{

    public async Task<IViewComponentResult> InvokeAsync(FormModel formModel)
    {
        var nationalId = HttpContext.Session.GetString("userNationalId");
        var fullName = HttpContext.Session.GetString("fullName");

        if (formModel.ProtectedByNafath == true && (nationalId == null || fullName == null))
        {
            using (var cref = context.EnsureUmbracoContext())
            {
                //use context here
                var arabicPage = cref.UmbracoContext.Content.GetById(2624).Url("ar-JO");
                arabicPage = WebUtility.UrlEncode(arabicPage);
                arabicPage = "/" + arabicPage + "?redirectId=" + formModel.ModelId;
                httpContextAccessor.HttpContext.Response.Redirect(arabicPage);
                return View("FormError", new FormModel());
            }
        }
        return View("Form", formModel);
    }
}