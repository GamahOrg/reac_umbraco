using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public class EjarService(RestClient client, string clientId, string clientSecret)
    : ApigeeBase(client, clientId, clientSecret)
{
    public EjarContractResponse GetContractById(EjarQueryParms queryParms)
    {
        var request =
            new RestRequest(
                $"/v1/ejar/contracts")
            {
                Method = Method.Get
            };
        request.AddHeader("Content-Type", "application/json");
        request.AddParameter("id_number", queryParms.IdNumber, ParameterType.QueryString);
        request.AddParameter("birth_date_hijri", queryParms.BirthDateHijri, ParameterType.QueryString);
        request.AddParameter("page", 1, ParameterType.QueryString);
        request.AddParameter("size", 30, ParameterType.QueryString);


        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<EjarContractResponse>(response.Content ?? "{}");
    }
    
    public EjarContractDetailsResponse GetContractDetails(string idNumber, string contractNumber, string major_version, string minor_version)
    {
        var request =
            new RestRequest(
                $"/v1/ejar/contracts-inquiry/details")
            {
                Method = Method.Get
            };
        request.AddHeader("Content-Type", "application/json");
        request.AddParameter("id_number", idNumber, ParameterType.QueryString);
        request.AddParameter("contract_number", contractNumber, ParameterType.QueryString);
        request.AddParameter("major_version", major_version, ParameterType.QueryString);
        request.AddParameter("minor_version", minor_version, ParameterType.QueryString);


        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<EjarContractDetailsResponse>(response.Content ?? "{}");
    }
}