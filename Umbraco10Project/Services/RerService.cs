using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public class RerService(RestClient client, string clientId, string clientSecret)
    : ApigeeBase(client, clientId, clientSecret)
{


    public RerTitleInquiryResponse GetTitleInquiry(RerTitleInquiryQueryParms queryParms)
    {
        var request =
            new RestRequest(
                $"/v1/rer/get-title-inquiry")
            {
                Method = Method.Get
            };
        request.AddHeader("Content-Type", "application/json");
        request.AddParameter("RealEstateNumber", queryParms.RealEstateNumber, ParameterType.QueryString);
        if (queryParms.FirstRegistrationDate != null)
            request.AddParameter("FirstRegistrationDate", queryParms.FirstRegistrationDate,
                ParameterType.QueryString);
        if (queryParms.IdNumber != null)
        {
            request.AddParameter("IdNumber", queryParms.IdNumber, ParameterType.QueryString);
            request.AddParameter("IdType", "1", ParameterType.QueryString);
        }

        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<RerTitleInquiryResponse>(response.Content ?? "{}");
    }

    public RerRegistrarLicenseResponse GetRegistrarList(RerRegistrarQueryParms queryParms)
    {
        var request =
            new RestRequest(
                $"/licenses/v1/registrar-list")
            {
                Method = Method.Get
            };
        request.AddHeader("Content-Type", "application/json");
        request.AddParameter("page", queryParms.CurrentPage, ParameterType.QueryString);
        request.AddParameter("limit", queryParms.PageSize, ParameterType.QueryString);
        if (!string.IsNullOrWhiteSpace(queryParms.LicenseNumber))
        {
            request.AddParameter("license_number", queryParms.LicenseNumber, ParameterType.QueryString);
        }

        var response = SendRequest(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<RerRegistrarLicenseResponse>(response.Content ?? "{}");
    }
}