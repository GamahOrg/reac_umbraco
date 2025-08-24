using System.Text.Json.Serialization;

namespace Umbraco10Project.Models;

public class LoginNafath 
{
    [JsonPropertyName("Action")]
    public string Action { get; set; }
    [JsonPropertyName("Parameters")]
    public RequestParameters Parameters { get; set; }
}

public class RequestParameters
{
    public string? service { get; set; }
    public string? transId { get; set; }
    public string? random { get; set; }
    
    public string id { get; set; }
}
