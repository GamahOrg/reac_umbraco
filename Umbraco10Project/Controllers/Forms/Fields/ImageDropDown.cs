using Umbraco.Forms.Core.Attributes;
using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    [Serializable]
    public class ImageDropDown : Umbraco.Forms.Core.FieldType
    {
        public ImageDropDown()
        {
            Id = new Guid("6dff0025-528c-4345-89d7-222256DC9593");
            Name = "Image Drop Down";
            Description = "Render a dropdown as image list";
            Category = "List";
            Icon = "icon-bulleted-list";
            DataType = FieldDataType.String;
            Category = "Date";
            SortOrder = 90;

            FieldTypeViewName = "FieldType.ImageDropDown.cshtml";
        }
   
       /// <summary>Gets or sets a default value for the form field.</summary>
    [Setting("Default Value", Description = "Enter a default value.", SupportsPlaceholders = true, DisplayOrder = 10)]
    public virtual string DefaultValue { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether multiple values can be selected.
    /// </summary>
    [Setting("Allow multiple selections", Description = "Indicate whether multiple selections from the list are allowed.", View = "checkbox", DisplayOrder = 20)]
    public virtual string AllowMultipleSelections { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether the field label should be shown.
    /// PreValues are a single element, a boolean indicating whether the default for the the checkbox is "checked".
    /// </summary>
    [Setting("Show Label", Description = "Indicate whether the the field's label should be shown when rendering the form.", View = "checkbox", PreValues = "true", DisplayOrder = 30)]
    public virtual string ShowLabel { get; set; } = string.Empty;

    /// <inheritdoc />
    public override bool HideLabel => this.ShowLabel == "False";

    /// <summary>
    /// Gets or sets the form field's autocomplete attribute value.
    /// </summary>
    [Setting("Autocomplete attribute", Description = "Optionally enter a value for the autocomplete attribute.", View = "TextField", DisplayOrder = 40)]
    public virtual string AutocompleteAttribute { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the selection prompt for the drop-down list.
    /// </summary>
    [Setting("Prompt for selection", Description = "Optionally provide a prompt for the user's selection.", SupportsPlaceholders = true, View = "TextField", DisplayOrder = 40)]
    public virtual string SelectPrompt { get; set; } = string.Empty;

    /// <inheritdoc />
    public override bool SupportsPreValues => true;

    /// <inheritdoc />
    public override string EditView
    {
      get => !(this.AllowMultipleSelections == "True") ? "dropdown-single" : "dropdown-multiple";
    }
    }
}