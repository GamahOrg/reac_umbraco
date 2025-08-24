using Umbraco10Project.Models;
namespace Umbraco10Project.Controllers.Models.SuggestionsInquiriesModels;
using System.ComponentModel.DataAnnotations;

public enum RequestClassificationEnum
{
    enquiry_c,
    suggestion_c,
    complaint_c
}

public class CaseData
{
    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string name { get; set; }

    [Required]
    [MinLength(3)]
    [MaxLength(100)]
    public string description { get; set; }

    [Required]
    [EnumDataType(typeof(RequestClassificationEnum))]
    public string requestclassification_c { get; set; }

    [MaxLength(50)]
    public string? rejon_c { get; set; } = null;

    [MaxLength(50)]
    public string? request_number_c { get; set; } = null;

    [MaxLength(50)]
    public string? reference_number_c { get; set; } = null;

    [Required]
    public string service_type_c { get; set; }
    public string priority { get; } = "P3";
    public string status { get; } = "Open_New";
    public string account_id { get; } = "ACCOUNT_ID";
    public string reqclass_c { get; } = "internal";
    public string contact_soruce_c { get; } = "Web";
    public string jihah_following_c { get; } = "Rega";
}

public class ContactData
{
    [RegularExpression(@"^[{(]?[0-9a-fA-F]{8}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{12}[)}]?$")]
    public string? id { get; set; } = null;

    [Required]
    [MinLength(10)]
    [MaxLength(10)]
    public string national_id_c { get; set; }

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string first_name { get; set; }

    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string last_name { get; set; }

    [Required]
    [EmailAddress]
    public string email1 { get; set; }

    [Required]
    [Phone]
    [RegularExpression("^05[0-9]{8}$")]
    public string phone_mobile { get; set; }
}

public class SubmitDataRequest
{
    public ContactData contact { get; set; }

    public CaseData caseData { get; set; }

    [MinLength(0)]
    [MaxLength(4, ErrorMessage = "A maximum of 4 note IDs are allowed.")]
    public string[] noteIds { get; set; } = [];
}


public class SubmitDataResponse
{
    public string contactId { get; set; }
    public string caseId { get; set; }
}


