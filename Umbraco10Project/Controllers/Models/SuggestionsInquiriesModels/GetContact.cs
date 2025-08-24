using AutoMapper;
using Umbraco10Project.Models;
namespace Umbraco10Project.Controllers.Models.SuggestionsInquiriesModels;

public class ContactValue
{
    public string id { get; set; }
    public string first_name { get; set; }
    public string last_name { get; set; }
    public string email1 { get; set; }
    public string national_id_c { get; set; }
    public string phone_mobile { get; set; }

}

public class CaseValue
{
    public string case_number { get; set; }

}

public class ItemValue
{
    public string name { get; set; }
    public string value { get; set; }
}

public class EntryList
{
    public string id { get; set; }
    public string module_name { get; set; }
    public Dictionary<string, ItemValue> name_value_list { get; set; }
}

public class ContactResponseData
{
    public int result_count { get; set; }

    public EntryList[] entry_list { get; set; }

}

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Dictionary<string, ItemValue>, ContactValue>()
            .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.ContainsKey("id") ? src["id"].value : null))
            .ForMember(dest => dest.first_name, opt => opt.MapFrom(src => src.ContainsKey("first_name") ? src["first_name"].value : null))
            .ForMember(dest => dest.last_name, opt => opt.MapFrom(src => src.ContainsKey("last_name") ? src["last_name"].value : null))
            .ForMember(dest => dest.email1, opt => opt.MapFrom(src => src.ContainsKey("email1") ? src["email1"].value : null))
            .ForMember(dest => dest.national_id_c, opt => opt.MapFrom(src => src.ContainsKey("national_id_c") ? src["national_id_c"].value : null))
            .ForMember(dest => dest.phone_mobile, opt => opt.MapFrom(src => src.ContainsKey("phone_mobile") ? src["phone_mobile"].value : null));
    }
}