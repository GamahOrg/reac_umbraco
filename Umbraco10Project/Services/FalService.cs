using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public class FalService(RestClient client, string clientId, string clientSecret)
    : ApigeeBase(client, clientId, clientSecret)
{


    public FalBrokerResponse GetBrokerLicensesInformation(FalBrokerQueryParms queryParms)
    {
        var request =
            new RestRequest(
                $"/v1/nhc/brokerage/GetBrokerLicensesInformation")
            {
                Method = Method.Get
            };
        request.AddHeader("Content-Type", "application/json");
        request.AddParameter("brokerType", queryParms.BrokerType, ParameterType.QueryString);
        request.AddParameter("id", queryParms.IdNumber, ParameterType.QueryString);


        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<FalBrokerResponse>(response.Content ?? "{}");
    }
}