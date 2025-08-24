
using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    public class ModernFileUpload : Umbraco.Forms.Core.FieldType
    {
        public ModernFileUpload()
        {
            Id = new Guid("6dff0075-598c-3345-89d7-222256D89593");
            Name = "ModernFileUpload";
            Description = "Modern File Upload.";
            Icon = "icon-download-alt";
            DataType = FieldDataType.String;
            SortOrder = 10;

            FieldTypeViewName = "FieldType.ModernFileUpload.cshtml";
            SupportsRegex = false;

        }
        

    }
}