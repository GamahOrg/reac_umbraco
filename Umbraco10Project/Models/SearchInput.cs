namespace Umbraco10Project.Models
{
    [Serializable]
    public class SearchInput
    {
        public string? mainServiceID { get; set; }
        public string? inquiryID { get; set; }
        public string? searchViaID { get; set; }
        public int ResultPageId { get; set; }
        // Dynamic properties
        public Dictionary<string, string>? dynamicInputs { get; set; }

        public SearchInput()
        {
            dynamicInputs = new Dictionary<string, string>();
        }

    }
}
