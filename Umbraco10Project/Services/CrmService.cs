using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Models;
using uSync.Core;

namespace Umbraco10Project.Services;

public class CrmService : RegaApiBase
{
    private static string _accessToken = "";

    public CrmService(string regaEndpoint,
        string clientId,
        string clientSecret) : base(regaEndpoint, clientId, clientSecret)
    {
        if (_accessToken.IsNullOrWhiteSpace())
        {
            _accessToken = GetToken();
        }
    }

    public string GetReportRegion()
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetReportRegion")
            {
                Method = Method.Get
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        var response = _client.ExecuteAsync(request).Result;
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return response.Content;
    }

    public string GetReportType()
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetReportType")
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

        return response.Content;
    }

    public string GetReportClassification(string type)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetReportClassification")
            {
                Method = Method.Get
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        request.AddParameter("Type", type);
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

        return response.Content;
    }

    public string GetReportOffender(string type)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetReportOffender")
            {
                Method = Method.Get
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        request.AddParameter("Type", type);
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

        return response.Content;
    }

    public string GetMobileNumber(string id)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetMobileNumberByNationalId/" + id)
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

        return response.Content;
    }

    public string AddNewReport(ComplaintModels obj, List<Files> files)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/AddNewReport")
            {
                Method = Method.Post
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        request.AddParameter("NID", obj.IdNumber);
        request.AddParameter("Title", obj.ReportSubject);
        request.AddParameter("Description", obj.ReportDescription);
        request.AddParameter("Report_Type", obj.TypeOfReport);
        request.AddParameter("Region", obj.Region);
        request.AddParameter("Source", "Rega_Website");
        request.AddParameter("Advertiser_Name", obj.FullName);
        request.AddParameter("Report_Classification", obj.ReportClassification);
        request.AddParameter("Report_Offender", obj.TypeOfReported);
        request.AddParameter("Link", obj.PlatformLink);
        request.AddParameter("Email", obj.Email);
        request.AddParameter("Transferrecord_city", obj.City);
        foreach (Files file in files)
        {
            request.AddFile("files", file.ByteFile, file.FileName, file.ContentType);
        }

        var response = _client.ExecuteAsync(request).Result;
        if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        {
            _accessToken = GetToken();
            request.AddOrUpdateHeader("Authorization", "Bearer " + _accessToken);
            response = _client.ExecuteAsync(request).Result;
        }
        if (!response.IsSuccessful)
        {
            throw new Exception("Error while creating new report");
        }

        return response.Content;
    }

    public string AddUser(dynamic body)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/AddNewContact")
            {
                Method = Method.Post
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        string jsonData = JsonConvert.SerializeObject(body);
        request.AddParameter("application/json", jsonData, ParameterType.RequestBody);

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

        return response.Content;
    }

    public string GetReportsByCaseNumber(string id)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetReportsByCasenumber/" + id)
            {
                Method = Method.Get
            };
        request.AddHeader("Authorization", "Bearer " + _accessToken);
        var response = _client.ExecuteAsync(request).Result;
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return response.Content;
    }

    public string GetReportsByContactId(string id)
    {
        var request =
            new RestRequest(
                $"/v1/rega/crm/api/CRM/GetReportsByContactId/" + id)
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

        return response.Content;
    }

}