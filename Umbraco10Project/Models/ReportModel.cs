namespace Umbraco10Project.Models
{
    public class ReportModel
    {
        public string FullName { get; set; }
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public string City { get; set; }
        public string ReportedName { get; set; }
        public string ReportedNumber { get; set; }
        public string TypeOfReport { get; set; }
        public string TypeOfReported { get; set; }
        public string ReportClassification { get; set; }
        public string ReportSubject { get; set; }
        public string ReportDescription { get; set; }
        public string PlatformLink { get; set; }
        [AllowedFileExtensions(ErrorMessage = "Only .mp4, .webm, .jpg, .jpeg, .png, .pdf files are allowed")]
        [MaxFileSize(10 * 1024 * 1024, ErrorMessage = "Maximum file size is 10 MB")]
        public List<IFormFile> Attachment { get; set; }
    }
}
