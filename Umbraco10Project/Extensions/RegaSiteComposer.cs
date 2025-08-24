using NewsletterStudio.Web.Composing;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Security;
using Umbraco.Forms.Core.Providers;
using Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customContentPickerControl;
using Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customHtmlEmailControl;
using Umbraco10Project.Controllers;
using Umbraco10Project.Controllers.Forms.Fields;
using Umbraco10Project.Helpers;

namespace Umbraco10Project.Extensions;

public class RegaSiteComposer
{
    public class Startup : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.WithCollectionBuilder<FieldCollectionBuilder>()
                .Add<NationalityList>()
                .Add<CityList>()
                .Add<CustomTextField>()
                .Add<AdvancedDatePicker>()
                .Add<ImageDropDown>()
                .Add<RegionList>();
            
            builder.NewsletterStudio().EmailControlTypes.Append<CustomHtmlEmailControlType>();
            builder.NewsletterStudio().EmailControlTypes.Append<CustomContentPickerControlType>();
            builder.Services.AddSingleton<IFileStreamSecurityAnalyzer, SvgXssSecurityAnalyzer>();
            builder.Services.AddSingleton<IFileStreamSecurityAnalyzer, PdfXssSecurityAnalyzer>();

        }
    }
}