using NewsletterStudio.Core.Editor.Controls;
using NewsletterStudio.Core.Editor.Models;
using NewsletterStudio.Core.Rendering;

namespace Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customHtmlEmailControl;

public class CustomHtmlEmailControlType : EmailControlTypeBase<CustomHtmlEmailControlData, CustomHtmlEmailControlViewModel>
{

    public override string Alias => "customHtml";
    public override string ViewRender => "/App_Plugins/newsletterStudioExtensions/controller/customHtmlEmailControl/view.html";
    public override string ViewEdit => "/App_Plugins/newsletterStudioExtensions/controller/customHtmlEmailControl/edit.html";

    public override string Icon => "icon-code";
    public override string IconSvg { get; }
    

    public override CustomHtmlEmailControlViewModel DoBuildViewModel(CustomHtmlEmailControlData model, EmailControlRenderingData renderingData)
    {
        // This method will be called once for each Campaign, this can be used to perform work that is not 
        // unique to the recipient. In our case the content of the textarea will always be the same so we 
        // can safely perform all our work here.

        var baseViewModel = new CustomHtmlEmailControlViewModel();
        baseViewModel.Padding = model.Padding;
        baseViewModel.Html = model.Html;

        return baseViewModel;
    }

    public override CustomHtmlEmailControlViewModel DoUpdateUniqueViewModel(CustomHtmlEmailControlViewModel model, IRecipientDataModel recipient)
    {
        // This method is called once for every recipient, the "model" object will be a clone
        // of the result from the DoBuildViewModel-method. Here we could update specific properties
        // based on the recipient. In our case we don't need to do this.

        if (recipient is SubscriberRecipientDataModel subscriberRecipient)
        {
            // A Campaign in sending
            // Do something with SubscriberRecipientDataModel 
        }

        if (recipient is TransactionalRecipientDataModel transactionalRecipient)
        {
            // A Transactional Email is sending
            // Do something with TransactionalRecipientDataModel 
        }

        return model;
    }

    public override CustomHtmlEmailControlData BuildEmptyInstance()
    {
        // This method is called to create an empty instance of the model, 
        // used to set default values when the control is dragged from the toolbox into
        // the email.

        return new CustomHtmlEmailControlData()
        {
            Padding = Padding.Default,
            Html = "<p>Sample HTML</p>"
        };
    }

    public override void DoPrepareForEdit(CustomHtmlEmailControlData control)
    {
        // This method is called when the editor is loaded, here we can pass meta-data to the control
        // the meta data is not saved but only used for the front end editing
        control.Meta.Add("foo","bar");

        base.DoPrepareForEdit(control);
    }
}
