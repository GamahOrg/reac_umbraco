using Umbraco.Forms.Core.Enums;

namespace Umbraco10Project.Controllers.Forms.Fields
{
    public class RegionList : Umbraco.Forms.Core.FieldType
    {
        public RegionList()
        {
            Id = new Guid("6dff0075-598c-4345-89d7-212226D89593");
            Name = "RegionList";
            Description = "Render a Region List field.";
            Icon = "icon-bulleted-list";
            DataType = FieldDataType.String;
            SortOrder = 10;

            FieldTypeViewName = "FieldType.RegionList.cshtml";
            SupportsRegex = false;

        }
        

    }
}