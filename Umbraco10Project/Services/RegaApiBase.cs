using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public abstract class RegaApiBase
{
    protected readonly RestClient _client;
    private string _clientId;
    private string _clientSecret;

    protected RegaApiBase(string regaEndpoint, string clientId, string clientSecret)
    {
        _client = new RestClient(regaEndpoint);
        _clientId = clientId;
        _clientSecret = clientSecret;
    }


    protected string GetToken()
    {
        var request = new RestRequest("/v1/oauth")
        {
            Method = Method.Post
        };
        request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        request.AddParameter("grant_type", "client_credentials");
        request.AddParameter("client_id", _clientId);
        request.AddParameter("client_secret", _clientSecret);

        var response = _client.ExecuteAsync(request).Result;
        var authModel = JsonConvert.DeserializeObject<AuthModel>(response.Content);
        var bearerToken = authModel?.access_token;
        if (string.IsNullOrEmpty(bearerToken))
        {
            throw new Exception("No token found");
        }

        _client.AddDefaultHeader("Authorization", "Bearer " + bearerToken);
        return bearerToken;
    }


    protected RestResponse SendRequest(RestRequest request)
    {
        // Send the request

        var response = _client.ExecuteAsync(request).Result;
        if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            GetToken();
        response = _client.ExecuteAsync(request).Result;
        return response;
    }
}