using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;

namespace Umbraco10Project.Models
{
    public class Report
    {
        public Report() { }
        public Report(
            string nid, string first_name, string last_name,
            string phone_mobile, string email, string title,
            string description, string report_Classification, string report_Type,
            string region, string violationType, string source,
            string other, string link, string advertiser_Name,
            string serial_Number, string created_Date, string modified_Date,
            string resolution, string offender_type, string transferrecord_city, string report_SubClassification,
            string id, string state, string partner_notes
            )
        {
            this.nid = nid;
            this.first_name = first_name;
            this.last_name = last_name;
            this.phone_mobile = phone_mobile;
            this.email = email;
            this.title = title;
            this.description = description;
            this.report_Classification = report_Classification;
            this.report_Type = report_Type;
            this.region = region;
            this.violationType = violationType;
            this.source = source;
            this.other = other;
            this.link = link;
            this.advertiser_Name = advertiser_Name;
            this.serial_Number = serial_Number;
            this.created_Date = created_Date;
            this.modified_Date = modified_Date;
            this.resolution = resolution;
            this.offender_type = offender_type;
            this.transferrecord_city = transferrecord_city;
            this.report_SubClassification = report_SubClassification;
            this.id = id;
            this.state = state;
            this.partner_notes = partner_notes;
        }

        public string nid { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string phone_mobile { get; set; }
        public string email { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string report_Classification { get; set; }
        public string report_Type { get; set; }
        public string region { get; set; }
        public string violationType { get; set; }
        public string source { get; set; }
        public string other { get; set; }
        public string link { get; set; }
        public string advertiser_Name { get; set; }
        public string serial_Number { get; set; }
        public string created_Date { get; set; }
        public string modified_Date { get; set; }
        public string resolution { get; set; }
        public string offender_type { get; set; }
        public string transferrecord_city { get; set; }
        public string report_SubClassification { get; set; }
        public string id { get; set; }
        public string state { get; set; }
        public string partner_notes { get; set; }
        public List<IFormFile> files { get; set; }


    }
}
