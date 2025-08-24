using NewsletterStudio.Core.Rendering.ViewModels;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customContentPickerControl;

public class CustomContentPickerControlViewModel : EmailControlViewModelBase
{
    public object Title { get; set; } 
    public bool OverrideTitle { get; set; } 
    public string TextAlign { get; set; } 
    public int? SelectedContent { get; set; } 
    public bool ShowImage { get; set; } 
}