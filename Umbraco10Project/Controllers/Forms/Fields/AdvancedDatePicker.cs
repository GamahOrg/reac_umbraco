using Umbraco.Forms.Core.Attributes;
using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    [Serializable]
    public class AdvancedDatePicker : Umbraco.Forms.Core.FieldType
    {
        public AdvancedDatePicker()
        {
            Id = new Guid("6dff0025-528c-4345-89d7-222256D89593");
            Name = "Advanced Date Picker";
            Description = "Render an Advanced dropdown.";
            Category = "List";
            Icon = "icon-calendar";
            DataType = FieldDataType.String;
            Category = "Date";
            SortOrder = 90;

            FieldTypeViewName = "FieldType.AdvancedDatePicker.cshtml";
            SupportsRegex = false;
            RenderView = "date";
            EditView = "date";
        }
   
        [Setting("IsHijri",
            Description = "Is hijri date.",
            View = "checkbox", PreValues = "false", DisplayOrder = 31)]
        public virtual string IsHijri { get; set; }
    }
}