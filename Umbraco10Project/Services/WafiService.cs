using Newtonsoft.Json;
using RestSharp;
using Umbraco10Project.Models;
using uSync.Core;

namespace Umbraco10Project.Services;

public class WafiService(RestClient client, string clientId, string clientSecret)
    : ApigeeBase(client, clientId, clientSecret)
{
    public async Task<WafiProjectDetails> GetProjectDetailsById(string? licenseProjectId)
    {
        var request =
            new RestRequest(
                $"/v1/wafi/GetProjectDetailsById?licenseProjectId={licenseProjectId}")
            {
                Method = Method.Get
            };
        var response = await SendRequestAsync(request);

        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<WafiProjectDetails>(response.Content ?? "{}");
    }

    public async Task<WafiProjectList> GetProjectList(WafiProjectQueryParms queryParms)
    {
        var request =
            new RestRequest(
                $"/v1/wafi/GetProjectList?" +
                $"pageIndex={queryParms.CurrentPage}&" +
                $"cityId={queryParms.CityId}&" +
                $"licenseRequestTypeId={queryParms.LicenseRequestTypeId}&" +
                $"pageSize={queryParms.PageSize}")
            {
                Method = Method.Get
            };
        var response = await SendRequestAsync(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<WafiProjectList>(response.Content ?? "{}");
    }

    public async Task<WafiCityList> GetCityList()
    {
        var request =
            new RestRequest(
                $"/v1/wafi/SysCity/Get")
            {
                Method = Method.Get
            };
        var response = await SendRequestAsync(request);
        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<WafiCityList>(response.Content ?? "{}");
    }

    public async Task<WafiLicenseRequestTypes> GetLicenseRequestTypes()
    {
        // var request =
        //  new RestRequest(
        //$"/v1/wafi/SysLicenseRequestType/GetLicenseRequestTypes")
        //  {
        //Method = Method.Get
        //  };
        // var response = await SendRequestAsync(request);
        // if (!response.IsSuccessful)
        // {
        //  throw new Exception("No Content Found");
        // }

        return JsonConvert.DeserializeObject<WafiLicenseRequestTypes>(
            "{\n \"data\": [\n  {\n\"name\": \"رخصة نطاق\",\n\"typeCode\": \"STSD\",\n\"id\": \"c8cbe878-77f9-43de-84bb-39137fd17f56\"\n  },\n  {\n\"name\": \" ر\u064fخصة تسويق مع استلام مبالغ\",\n\"typeCode\": \"SIU\",\n\"id\": \"0bce1393-e3b7-455c-97a6-3d0426ce5bee\"\n  },\n  {\n\"name\": \"رخصة بيع على الخارطة\",\n\"typeCode\": \"SRSU\",\n\"id\": \"e2271e31-87f6-411f-a896-6af70e601bbb\"\n  },\n  {\n\"name\": \" ر\u064fخصة تسويق بدون استلام مبالغ\",\n\"typeCode\": \"MFSPIKWORP\",\n\"id\": \"315b3b21-d5d2-4202-9cf2-b1c2b77a77d1\"\n  }\n ],\n \"isDone\": true,\n \"message\": \"\"\n}");
    }

    public async Task<CertifiedFacilities> GetCertifiedFacilities(WafiDeveloperQueryParms queryParms)
    {
        var request =
            new RestRequest(
                $"/v1/wafi/GetCertifiedFacilities?pageIndex={queryParms.CurrentDeveloperPage}&qualificationRequestTypeId={queryParms.QualificationTypeId}&facilityName={queryParms.FacilityName}&pageSize={queryParms.PageSize}")
            {
                Method = Method.Get
            };
        var response = await SendRequestAsync(request);

        if (!response.IsSuccessful)
        {
            throw new Exception("No Content Found");
        }

        return JsonConvert.DeserializeObject<CertifiedFacilities>(response.Content ?? "{}");
    }

    public async Task<WafiQualificationTypes> GetQualificationTypes()
    {
        // var request =
        //  new RestRequest(
        //$"/v1/wafi/SysQualificationType/GetQualificationTypes")
        //  {
        //Method = Method.Get
        //  };
        // var response = await SendRequestAsync(request);
        // if (!response.IsSuccessful)
        // {
        //  throw new Exception("No Content Found");
        // }

        return JsonConvert.DeserializeObject<WafiQualificationTypes>(
            "{\n \"data\": [\n  {\n\"typeName\": \"مطور عقاري المساهمات العقارية\",\n\"typeCode\": \"REEM\",\n\"id\": \"5182c2ea-08a9-4385-bcce-1647366633bd\"\n  },\n  {\n\"typeName\": \"مطور عقاري لجنة البيع على الخارطة\",\n\"typeCode\": \"RED01\",\n\"id\": \"07d21c3e-4f5d-4cd3-9443-3c0841e977dc\"\n  },\n  {\n\"typeName\": \"إستشاري هندسي\",\n\"typeCode\": \"EC\",\n\"id\": \"b77684f3-5090-43c4-a8d4-aa4c87356514\"\n  },\n  {\n\"typeName\": \"محاسب قانوني\",\n\"typeCode\": \"Acc\",\n\"id\": \"6e8d1108-a5ee-49b2-af80-dd7609d35ca7\"\n  }\n ],\n \"isDone\": true,\n \"message\": \"\"\n}");
    }
}