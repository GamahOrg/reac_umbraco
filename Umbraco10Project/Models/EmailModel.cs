namespace Umbraco10Project.Models
{
    public class SMTPModel
    {
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public string SenderEmail { get; set; }
        public string SenderPassword { get; set; }
        public int PortNo { get; set; }
        public string HostName { get; set; }
        public bool EnableSSL { get; set; }
        public bool UseDefaultCredentials { get; set; }
        public string SucessMessage { get; set; }
        public string SucessMessageTitle { get; set; }
        public List<IFormFile> AttachedFiles { get; set; }
        public string? RecieversTOEmails { get; set; }
        public string? RecieversCCEmails { get; set; }


        public SMTPModel()
        {
            EnableSSL = false;
            UseDefaultCredentials = true;
            PortNo = 578;
        }
    }
    
    public class EmailModel
    {
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public string RecieversTOEmails { get; set; }
        public string RecieversCCEmails { get; set; }
        public List<IFormFile> AttachedFiles { get; set; }
    }
}
