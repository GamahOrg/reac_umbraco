namespace Umbraco10Project.Models;

public class FalBrokerQueryParms
{
    public string ModelUrl { get; set; }
    public string BrokerType { get; set; }
    public string IdNumber { get; set; }

}

public class FalBrokerModel
{
    public string Title { get; set; }
    public bool ShowController { get; set; }
    public bool ShowAlert { get; set; }
    public FalBrokerQueryParms QueryParm { get; set; }
    public FalBrokerResponse response { get; set; }
}

public class FalBrokerResponse
{
    public Header? Header { get; set; }
    public Body? Body { get; set; }
}

public class Header
{
    public DateTime? ResTime { get; set; }
    public string? ChId { get; set; }
    public string? RefId { get; set; }
    public string? ReqID { get; set; }
    public Status? Status { get; set; }
}

public class Status
{
    public int? Code { get; set; }
    public string? Description { get; set; }
}

public class Body
{
    public List<FalBrokerResponseResult>? Result { get; set; }
    public string? TargetUrl { get; set; }
    public bool? Success { get; set; }
    public object? Error { get; set; }
    public bool? UnAuthorizedRequest { get; set; }
    public bool? Abp { get; set; }
}

public class FalBrokerResponseResult
{
    public Guid? Id { get; set; }
    public string? BrokerName { get; set; }
    public string? LicenseNumber { get; set; }
    public string? LicenseCode { get; set; }
    public string? IssueDate { get; set; } // Adjust to DateTime? if you prefer parsing dates
    public string? EndDate { get; set; }   // Adjust to DateTime? if you prefer parsing dates
    public string? LicenseName { get; set; }
    public string? Status { get; set; }
    public string? StatusCode { get; set; }
    public object? LicenseRemainingPeriod { get; set; }
}
