using System.Net;
using RestSharp;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public abstract class ApigeeBase
{
    private string _bearerToken = string.Empty;
    private DateTime _tokenExpiry = DateTime.MinValue;
    private readonly RestClient _client;
    private readonly string? _clientId;
    private readonly string? _clientSecret;
    private static readonly object TokenLock = new(); // Lock for concurrency-safe token refresh

    protected ApigeeBase(RestClient client, string clientId, string clientSecret)
    {
        _client = client;
        _clientId = clientId;
        _clientSecret = clientSecret;

        if (string.IsNullOrEmpty(_clientId) || string.IsNullOrEmpty(_clientSecret))
        {
            throw new Exception("Client ID and Client Secret must be provided.");
        }
    }

    private RestClient GetClientAsync()
    {
        if (string.IsNullOrEmpty(_bearerToken) || DateTime.Now >= _tokenExpiry)
        {
            _bearerToken = GetBearerTokenSafe();
        }
        return _client;
    }

    private string GetBearerTokenSafe()
    {
        lock (TokenLock)
        {
            if (DateTime.Now < _tokenExpiry && !string.IsNullOrEmpty(_bearerToken))
            {
                return _bearerToken;
            }

            return GetBearerTokenAsync();
        }
    }

    private string GetBearerTokenAsync()
    {
        var tokenRequest = new RestRequest("/v1/oauth") { Method = Method.Post };
        tokenRequest.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        tokenRequest.AddParameter("grant_type", "client_credentials");
        tokenRequest.AddParameter("client_id", _clientId);
        tokenRequest.AddParameter("client_secret", _clientSecret);

        var response = _client.Execute<AuthModel>(tokenRequest);
        if (response.IsSuccessful && response.Data != null)
        {
            _tokenExpiry = DateTime.Now.AddSeconds(Convert.ToDouble(response.Data.expires_in) - 30); // Buffer for token expiry
            return response.Data.access_token;
        }

        var errorMessage = $@"
        Failed to retrieve bearer token.
        Status Code: {response.StatusCode}
        Response Content: {response.Content}
        Error Message: {response.ErrorMessage}
        Request URL: {response.Request?.Resource}
        Request Parameters: {string.Join(", ", response.Request?.Parameters.Select(p => $"{p.Name}: {p.Value}"))}
        ";

        Console.WriteLine(errorMessage); // Use logging in a real-world scenario
        throw new Exception(errorMessage);
    }

    protected RestResponse SendRequest(RestRequest request, int maxRetries = 1)
    {
        var attempt = 0;
        RestResponse response;

        do
        {
            attempt++;
            var client = GetClientAsync();
            request.AddOrUpdateHeader("Authorization", $"Bearer {_bearerToken}");

            response = client.ExecuteAsync(request).Result;

            if (response.StatusCode == HttpStatusCode.Unauthorized && attempt <= maxRetries)
            {
                Console.WriteLine("Refreshing token due to Unauthorized response...");
                _bearerToken = GetBearerTokenSafe();
                request.AddOrUpdateHeader("Authorization", $"Bearer {_bearerToken}");
            }
        } while (response.StatusCode == HttpStatusCode.Unauthorized && attempt <= maxRetries);

        if (!response.IsSuccessful)
        {
            var errorMessage = $@"
            Request failed.
            Status Code: {response.StatusCode}
            Response Content: {response.Content}
            Error Message: {response.ErrorMessage}
            Request URL: {response.Request?.Resource}
            ";

            Console.WriteLine(errorMessage); // Use logging in a real-world scenario
            throw new Exception(errorMessage);
        }

        return response;
    }

    protected async Task<RestResponse> SendRequestAsync(RestRequest request, int maxRetries = 1)
    {
        var attempt = 0;
        RestResponse response;

        do
        {
            attempt++;
            var client = GetClientAsync();
            request.AddOrUpdateHeader("Authorization", $"Bearer {_bearerToken}");

            response = await client.ExecuteAsync(request);

            if (response.StatusCode == HttpStatusCode.Unauthorized && attempt <= maxRetries)
            {
                Console.WriteLine("Refreshing token due to Unauthorized response...");
                _bearerToken = GetBearerTokenSafe();
                request.AddOrUpdateHeader("Authorization", $"Bearer {_bearerToken}");
            }
        } while (response.StatusCode == HttpStatusCode.Unauthorized && attempt <= maxRetries);

        if (!response.IsSuccessful)
        {
            var errorMessage = $@"
            Request failed.
            Status Code: {response.StatusCode}
            Response Content: {response.Content}
            Error Message: {response.ErrorMessage}
            Request URL: {response.Request?.Resource}
            ";

            Console.WriteLine(errorMessage); // Use logging in a real-world scenario
            throw new Exception(errorMessage);
        }

        return response;
    }
}
