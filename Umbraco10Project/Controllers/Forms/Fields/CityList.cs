using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    public class CityList : Umbraco.Forms.Core.FieldType
    {
        public CityList()
        {
            Id = new Guid("6dff0075-592c-4345-89d7-212226D89593");
            Name = "CityList";
            Description = "Render a City List field.";
            Icon = "icon-bulleted-list";
            DataType = FieldDataType.String;
            SortOrder = 10;

            FieldTypeViewName = "FieldType.CityList.cshtml";
            SupportsRegex = false;

        }
        

    }
}