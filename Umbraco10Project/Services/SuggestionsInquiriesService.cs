using System.Net;
using System.Runtime.Caching;
using AutoMapper;
using Newtonsoft.Json;
using NPoco.fastJSON;
using RestSharp;
using Umbraco10Project.Controllers;
using Umbraco10Project.Controllers.Models.SuggestionsInquiriesModels;
using Umbraco10Project.Models;

namespace Umbraco10Project.Services;

public class SuggestionsInquiriesService : ApigeeBase
{
    private readonly IMapper _mapper;

    public SuggestionsInquiriesService(
        [FromKeyedServices("RegaInternalClient")] RestClient client,
        IConfiguration configuration,
        IMapper mapper
    )
        : base(
            client,
            configuration.GetValue<string>("variabels:RegaInternalClientId")
                ?? throw new InvalidOperationException(),
            configuration.GetValue<string>("variabels:RegaInternalClientSecret")
                ?? throw new InvalidOperationException()
        )
    {
        // You can store or use `mapper` as needed
        _mapper = mapper;
    }

    public GenericApiResponse<DropdownElements[]> GetModuleFieldValues(
        string moduleName,
        string fields
    )
    {
        var request = new RestRequest("/v1/rega/crm/module/fields") { Method = Method.Get };

        request.AddParameter("ModuleName", moduleName, ParameterType.QueryString);
        request.AddParameter("fields", fields, ParameterType.QueryString);

        var response = SendRequest(request);

        if (!response.IsSuccessful)
            throw new Exception(response.Content);
        if (response.Content == null)
            throw new Exception("No Content Found");

        var data = JsonConvert.DeserializeObject<ResponseData>(response.Content);
        var optionsArray = new List<DropdownElements>();

        if (data?.module_fields != null && data.module_fields.TryGetValue(fields, out var outField))
        {
            if (outField?.options != null)
            {
                optionsArray = outField
                    .options.Values.Where(option => !string.IsNullOrEmpty(option.name))
                    .Select(option => new DropdownElements
                    {
                        id = option.name,
                        enValue = option.name,
                        arValue = option.value,
                    })
                    .ToList();
            }
        }

        return new GenericApiResponse<DropdownElements[]>
        {
            Data = optionsArray.ToArray(),
            Success = optionsArray.Count > 0,
        };
    }

    public GenericApiResponse<ContactValue> GetContact(string nationalId)
    {
        var selectedFields = "id,first_name,last_name,email1,national_id_c,phone_mobile";
        var request = new RestRequest(
            "/v1/rega/crm/entry/list?ModuleName=Contacts&QueryField=national_id_c"
        )
        {
            Method = Method.Get,
        };

        request.AddParameter("QueryFieldValue", nationalId, ParameterType.QueryString);
        request.AddParameter("SelectFields", selectedFields, ParameterType.QueryString);

        var response = SendRequest(request);

        if (!response.IsSuccessful)
            throw new Exception(response.Content);
        if (response.Content == null)
            throw new Exception("No Content Found");

        var data = JsonConvert.DeserializeObject<ContactResponseData>(response.Content);
        var contact = new ContactValue();

        if (data?.entry_list != null && data.entry_list.Count() > 0)
        {
            var firstEntry = data.entry_list.FirstOrDefault();
            if (firstEntry?.name_value_list != null)
            {
                contact = _mapper.Map<ContactValue>(firstEntry.name_value_list);
            }
        }

        return new GenericApiResponse<ContactValue> { Data = contact, Success = true };
    }

    private async Task<string> CreateModule(string moduleName, Object data)
    {
        var request = new RestRequest("/v1/rega/crm/entry") { Method = Method.Post };
        request.AddJsonBody(new { module_name = moduleName, name_value_list = data });

        var response = SendRequest(request);

        if (!response.IsSuccessful)
        {
            Console.WriteLine($"Error: {response.Content}");
            throw new Exception($"Failed to create: {moduleName}");
        }

        // Deserialize only valid JSON content
        var responseData = JsonConvert.DeserializeObject<dynamic>(response.Content);

        return responseData?.id?.ToString() ?? throw new Exception("Invalid response structure");
    }

    private async Task LinkFieldToCase(string caseId, string fieldName, string[] related_ids)
    {
        var request = new RestRequest("/v1/rega/crm/relationship") { Method = Method.Post };
        request.AddJsonBody(
            new
            {
                module_name = "Cases",
                module_id = caseId,
                link_field_name = fieldName,
                related_ids = related_ids,
            }
        );

        var response = SendRequest(request);

        if (!response.IsSuccessful)
        {
            Console.WriteLine($"Error: {response.Content}");
            throw new Exception($"Failed to create {fieldName}");
        }
    }

    public async Task<GenericApiResponse<string>> Upload(IFormFile file)
    {
        var noteId = await CreateModule("Notes", new { name = file.FileName });

        var request = new RestRequest("/v1/rega/crm/note-attachment") { Method = Method.Post };

        request.AddHeader("Content-Type", "multipart/form-data");

        // Convert IFormFile to byte array
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        byte[] fileBytes = memoryStream.ToArray();

        // Encode content to base64
        string base64File = Convert.ToBase64String(fileBytes);

        var payload = new
        {
            note = new
            {
                id = noteId,
                filename = file.FileName,
                file = base64File,
            },
        };

        request.AddJsonBody(payload);
        var response = SendRequest(request);

        if (!response.IsSuccessful)
            throw new Exception("No Content Found");
        if (response.Content == null)
            return null;

        return new GenericApiResponse<string> { Data = noteId, Success = true };
    }

    public GenericApiResponse<CaseValue> GetCaseNumber(string caseId)
    {
        var selectedFields = "case_number";
        var request = new RestRequest(
            "/v1/rega/crm/entry/list?ModuleName=Cases&QueryField=cases.id"
        )
        {
            Method = Method.Get,
        };

        request.AddParameter("QueryFieldValue", caseId, ParameterType.QueryString);
        request.AddParameter("SelectFields", selectedFields, ParameterType.QueryString);

        var response = SendRequest(request);

        if (!response.IsSuccessful)
            throw new Exception(response.Content);


        var data = JsonConvert.DeserializeObject<ContactResponseData>(response.Content);
        var caseValue = new CaseValue();

        if (data?.entry_list != null && data.entry_list.Count() > 0)
        {
            var firstEntry = data.entry_list.FirstOrDefault();
            if (firstEntry?.name_value_list != null && firstEntry.name_value_list.TryGetValue("case_number", out var caseNumberItem))
            {
                caseValue.case_number = caseNumberItem.value; // Extract the actual value
            }

        }

        return new GenericApiResponse<CaseValue> { Data = caseValue, Success = true };
    }
    
    public async Task<GenericApiResponse<SubmitDataResponse>> Submit(SubmitDataRequest data)
    {
        // create Contact and Case Modules
        var contactId = data.contact.id ?? await CreateModule("Contacts", data.contact);
        var caseId = await CreateModule("Cases", data.caseData);

        // Link Contact and Notes to Case
        await LinkFieldToCase(caseId, "contacts", [contactId]);

        if (data.noteIds != null && data.noteIds.Count() > 0)
            await LinkFieldToCase(caseId, "notes", data.noteIds);

        return new GenericApiResponse<SubmitDataResponse>
        {
            Data = new SubmitDataResponse { contactId = contactId, caseId = caseId },
            Success = true,
        };
    }
}
