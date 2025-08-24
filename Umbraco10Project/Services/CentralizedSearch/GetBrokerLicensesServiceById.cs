using Microsoft.IdentityModel.Tokens;
using RestSharp;
using Umbraco10Project.Models;
using uSync.Core;

namespace Umbraco10Project.Services.CentralizedSearch;

public class GetBrokerLicensesServiceById
    : RegaApiBase {
    
    private static string _accessToken = "";
    public GetBrokerLicensesServiceById(string regaEndpoint,
        string clientId,
        string clientSecret) : base(regaEndpoint, clientId, clientSecret)
    {
        if (_accessToken.IsNullOrWhiteSpace())
        {
            _accessToken = GetToken();
        }
    }
    public SearchResultService CallApi(dynamic? searchInput)
    {
        var request =
            new RestRequest(
                $"/v1/nhc/brokerage/GetBrokerLicensesInformation?brokerType=Individual&id={searchInput?["idNumber"]}")
            {
                Method = Method.Get
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        var response = _client.ExecuteAsync(request).Result;
        if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        {
            _accessToken = GetToken();
            request.AddOrUpdateHeader("Authorization", "Bearer " + _accessToken);
            response = _client.ExecuteAsync(request).Result;
        }
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return new SearchResultService(new Dictionary<string, string>
        {
            ["brokerName"] = "BrokerName"
        }, new Dictionary<string, string>
        {
            ["brokerName"] = "$.Body.result[*].brokerName"
        }, response.Content);
    }
}