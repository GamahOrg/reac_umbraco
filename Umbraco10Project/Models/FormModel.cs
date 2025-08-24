namespace Umbraco10Project.Models;

public class FormModel
{
    public string ModelId { get; set; }
    public Guid? FormID { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool? ProtectedByNafath { get; set; }

}