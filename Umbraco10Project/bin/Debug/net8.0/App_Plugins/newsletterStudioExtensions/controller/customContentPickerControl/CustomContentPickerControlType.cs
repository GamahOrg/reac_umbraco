using NewsletterStudio.Core.Editor.Controls;
using NewsletterStudio.Core.Editor.Models;
using NewsletterStudio.Core.Rendering;

namespace Umbraco10Project.App_Plugins.newsletterStudioExtensions.Controller.customContentPickerControl;

public class CustomContentPickerControlType : EmailControlTypeBase<CustomContentPickerControlData, CustomContentPickerControlViewModel>
{

    public override string Alias => "customContentPicker";
    public override string ViewRender => "/App_Plugins/newsletterStudioExtensions/Controller/customContentPickerControl/view.html";
    public override string ViewEdit => "/App_Plugins/newsletterStudioExtensions/Controller/customContentPickerControl/edit.html";

    public override string Icon => "arrows-to-circle";
    public override string IconSvg { get; }
    

    public override CustomContentPickerControlViewModel DoBuildViewModel(CustomContentPickerControlData model, EmailControlRenderingData renderingData)
    {
        // This method will be called once for each Campaign, this can be used to perform work that is not 
        // unique to the recipient. In our case the content of the textarea will always be the same so we 
        // can safely perform all our work here.

        var baseViewModel = new CustomContentPickerControlViewModel();
        baseViewModel.Padding = model.Padding;
        baseViewModel.OverrideTitle = model.OverrideTitle;
        baseViewModel.Title = model.Title;
        baseViewModel.SelectedContent = model.SelectedContent;
        baseViewModel.TextAlign = model.TextAlign;
        baseViewModel.ShowImage = model.ShowImage;
        return baseViewModel;
    }

    public override CustomContentPickerControlViewModel DoUpdateUniqueViewModel(CustomContentPickerControlViewModel model, IRecipientDataModel recipient)
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

    public override CustomContentPickerControlData BuildEmptyInstance()
    {
        // This method is called to create an empty instance of the model, 
        // used to set default values when the control is dragged from the toolbox into
        // the email.

        return new CustomContentPickerControlData()
        {
            Padding = Padding.Default,
            TextAlign = "right",
            ShowImage = true,
            OverrideTitle = false
        };
    }

    public override void DoPrepareForEdit(CustomContentPickerControlData control)
    {
        // This method is called when the editor is loaded, here we can pass meta-data to the control
        // the meta data is not saved but only used for the front end editing
        control.Meta.Add("foo","bar");

        base.DoPrepareForEdit(control);
    }
}
