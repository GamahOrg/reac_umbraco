using System;
using Umbraco.Forms.Core.Attributes;
using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    public class CustomTextField : Umbraco.Forms.Core.FieldType
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="T:Umbraco.Forms.Core.Providers.FieldTypes.Textfield" /> class.
        /// </summary>
        public CustomTextField()
        {
            this.Id = new Guid("3F92E01B-23E2-4A30-BF33-9DF5580ED52C");
            this.Name = "Custom Short answer";
            this.Alias = "customShortAnswer";
            this.Description = "Renders an text input field, for short answers";
            this.Icon = "icon-autofill";
            this.DataType = FieldDataType.String;
            this.Category = "Simple";
            this.SortOrder = 10;
            this.ShowLabel = "True";
            this.FieldTypeViewName = "FieldType.CustomTextField.cshtml";
            this.EditView = "textfield";
        }

        /// <summary>Gets or sets a default value for the form field.</summary>
        [Setting("Default Value", Description = "Enter a default value.", SupportsPlaceholders = true,
            DisplayOrder = 10)]
        public virtual string DefaultValue { get; set; } = string.Empty;

        /// <summary>Gets or sets the form field's placeholder value.</summary>
        [Setting("Placeholder", Description = "Enter a HTML5 placeholder value.", View = "TextField",
            SupportsPlaceholders = true, DisplayOrder = 20)]
        public virtual string Placeholder { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets a value indicating whether the field label should be shown.
        /// PreValues are a single element, a boolean indicating whether the default for the the checkbox is "checked".
        /// </summary>
        [Setting("Show Label",
            Description = "Indicate whether the the field's label should be shown when rendering the form.",
            View = "checkbox", PreValues = "true", DisplayOrder = 30)]
        public virtual string ShowLabel { get; set; }

        [Setting("Disable",
            Description = "Indicate whether the the field's is disable or not.",
            View = "checkbox", PreValues = "false", DisplayOrder = 31)]
        public virtual string Disable { get; set; }
        /// <summary>
        /// Gets or sets the maximum length of the accepted entry in the field.
        /// </summary>
        [Setting("Maximum Length", Description = "Enter the maximum number of characters accepted.",
            View = "NumericField", PreValues = "1,255", DisplayOrder = 40)]
        public virtual string MaximumLength { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the maximum length of the accepted entry in the field.
        /// </summary>
        [Setting("Field Type", Description = "Select the type of information expected.", View = "dropdownlist",
            PreValues = "date,datetime-local,email,tel,text,number,time,url,week", DisplayOrder = 50)]
        public virtual string FieldType { get; set; } = string.Empty;

        /// <inheritdoc />
        public override bool HideLabel => this.ShowLabel == "False";

        /// <summary>
        /// Gets or sets the form field's autocomplete attribute value.
        /// </summary>
        [Setting("Autocomplete attribute", Description = "Optionally enter a value for the autocomplete attribute.",
            View = "TextField", DisplayOrder = 60)]
        public virtual string AutocompleteAttribute { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the form field's autocomplete attribute value.
        /// </summary>
        [Setting("Custom Css Class", Description = "Optionally enter a value for the custom css class.",
            View = "TextField", DisplayOrder = 70)]
        public virtual string CustomCssClass { get; set; } = string.Empty;
        
        /// <inheritdoc />
        public override bool SupportsRegex => true;
    }
}