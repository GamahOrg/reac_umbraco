using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    public class NationalityList : Umbraco.Forms.Core.FieldType
    {
        public NationalityList()
        {
            Id = new Guid("6dff0075-598c-4345-89d7-222256D89593");
            Name = "NationalityList";
            Description = "Render a Nationality List field.";
            Icon = "icon-bulleted-list";
            DataType = FieldDataType.String;
            SortOrder = 10;

            FieldTypeViewName = "FieldType.NationalityList.cshtml";
            SupportsRegex = false;

        }
        

    }
}