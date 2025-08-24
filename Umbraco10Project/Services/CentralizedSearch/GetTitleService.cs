using Microsoft.IdentityModel.Tokens;
using RestSharp;
using Umbraco10Project.Models;
using uSync.Core;

namespace Umbraco10Project.Services.CentralizedSearch;

public class GetTitleService
    : RegaApiBase
{
    
    private static string _accessToken = "";
    public GetTitleService(string regaEndpoint,
        string clientId,
        string clientSecret) : base(regaEndpoint, clientId, clientSecret)
    {
        if (_accessToken.IsNullOrWhiteSpace())
        {
            _accessToken = GetToken();
        }
    }
    public  SearchResultService CallApi(dynamic? searchInput)
    {

        var request =
            new RestRequest(
                $"/v1/rer/get-title-inquiry?RealEstateNumber={searchInput?["proportyID"]}&" +
                $"FirstRegistrationDate={searchInput?["FirstRegistrationDate#day"]}-{searchInput?["FirstRegistrationDate#month"]}-{searchInput?["FirstRegistrationDate#year"]}")
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
            ["estateInfoSection"] = "Estate Info",
            ["status"] = "status",
            ["realEstateNumber"] = "Real Estate Number",
            ["propertyUse"] = "Property Use",
            ["areaSize"] = "Area Size",
            ["originMojDeed"] = "Origin Moj Deed",
            ["firstRegistrationDateH"] = "Registration Date",
            ["locationSection"] = "Location Info",
            ["cityNameAr"] = "City",
            ["districtNameAr"] = "District",
            ["blockNumber"] = "Block Number",
            ["planNumber"] = "Plan Number",

        }, new Dictionary<string, string>
        {
            ["estateInfoSection"] = "@SECTION",
            ["status"] = "$.status",
            ["realEstateNumber"] = "$.generalInformation.realEstateNumber",
            ["propertyUse"] = "$.spatial.propertyUse",
            ["areaSize"] = "$.spatial.areaSize",
            ["originMojDeed"] = "$.originMojDeed.number",
            ["firstRegistrationDateH"] = "$.generalInformation.firstRegistrationDateG",
            ["locationSection"] = "@SECTION",
            ["cityNameAr"] = "$.address.cityNameAr",
            ["districtNameAr"] = "$.address.districtNameAr",
            ["blockNumber"] = "$.address.blockNumber",
            ["planNumber"] = "$.address.planNumber",
        }, response.Content);
    }
}