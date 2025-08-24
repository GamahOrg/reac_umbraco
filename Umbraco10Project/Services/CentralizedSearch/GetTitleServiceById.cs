using Microsoft.IdentityModel.Tokens;
using RestSharp;
using Umbraco10Project.Models;
using uSync.Core;

namespace Umbraco10Project.Services.CentralizedSearch;

public class GetTitleServiceById
    : RegaApiBase {
    
    private static string _accessToken = "";
    public GetTitleServiceById(string regaEndpoint,
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
                $"/v1/rer/get-title-inquiry?RealEstateNumber={searchInput?["proportyID"]}&" +
                $"IdType={searchInput?["idType"]}&IdNumber={searchInput?["idNumber"]}")
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
            ["status"] = "status",
            ["realEstateNumber"] = "Real Estate Number",
            ["address"] = "Address",
            ["propertyUse"] = "Property Use",
            ["areaSize"] = "Area Size"
        }, new Dictionary<string, string>
        {
            ["status"] = "$.status",
            ["realEstateNumber"] = "$.generalInformation.realEstateNumber",
            ["address"] = "$.address.cityNameAr;$.address.districtNameAr",
            ["propertyUse"] = "$.spatial.propertyUse",
            ["areaSize"] = "$.spatial.areaSize"
        }, response.Content);
    }
}