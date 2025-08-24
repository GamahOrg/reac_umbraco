using System.Text.Json;
using RestSharp;
using Umbraco10Project.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Umbraco10Project.Services;

public class NafathService(RestClient client, string clientId, string clientSecret)
    : ApigeeBase(client, clientId, clientSecret)
{
    public Dictionary<string, string> Login(LoginNafath body)
    {
        var request = new RestRequest($"/v2/iam/nafath") { Method = Method.Post };
        request.AddHeader("Accept", "*/*");
        request.AddHeader("Content-Type", "application/json");
        request.AddJsonBody(body);
        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        var content = response.Content;
        if (string.IsNullOrWhiteSpace(content))
        {
            throw new Exception("No Content Found");
        }

        var _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
        };
        var Items = JsonSerializer.Deserialize<Dictionary<string, string>>(
            content,
            _serializerOptions
        );
        if (Items == null)
        {
            throw new Exception("No Content Found");
        }

        return Items;
    }

    public string Check(LoginNafath body)
    {
        var request = new RestRequest($"/v2/iam/nafath") { Method = Method.Post };
        request.AddJsonBody(body);
        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return response.Content;
    }

    public string GetUserInfo(string nafathToken)
    {
        var request = new RestRequest($"/v2/iam/identityServices/userInfo") { Method = Method.Get };
        request.AddHeader("Accept", "*/*");
        request.AddHeader("Content-Type", "application/json");
        request.AddHeader("nafath-token", nafathToken);
        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return response.Content;
    }
}
