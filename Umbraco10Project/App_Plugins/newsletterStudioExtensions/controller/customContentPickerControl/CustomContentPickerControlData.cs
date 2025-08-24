using NewsletterStudio.Core.Editor.Models;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customContentPickerControl;

public class CustomContentPickerControlData : EmailControl
{
    public const string Alias = "customContentPicker";

    public override string ControlTypeAlias => Alias;

    public object Title { get; set; }
    public bool OverrideTitle { get; set; }
    public string TextAlign { get; set; }
    public int? SelectedContent { get; set; }

    public Padding Padding { get; set; }
    public bool ShowImage { get; set; } 

}