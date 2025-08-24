using NewsletterStudio.Core.Editor.Models;

namespace Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customHtmlEmailControl;

public class CustomHtmlEmailControlData : EmailControl
{
    public const string Alias = "customHtml";

    public override string ControlTypeAlias => Alias;

    public string Html { get; set; }

    public Padding Padding { get; set; }

}