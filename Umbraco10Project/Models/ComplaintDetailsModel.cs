using AutoMapper;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace Umbraco10Project.Models;

public class ComplaintDetailsModel
{
    public int Id { get; set; }
    public string StatusName { get; set; }
    public DateTime CreatedDate { get; set; }
    public List<SectionsDetails> Sections { get; set; }
    public List<ComplaintHistory> History { get; set; }
}

public class ComplaintHistory
{
    public string ActionType { get; set; }
    public DateTime ActionDate { get; set; }
}

public class SectionsDetails
{
    public string englishLabel { get; set; }
    public string arabicLabel { get; set; }
    public List<SectionFields> fields { get; set; }
}

public class SectionFields
{
    public string fieldId { get; set; }
    public string englishLabel { get; set; }
    public string arabicLabel { get; set; }
    public string fieldType { get; set; }
    public List<string> values { get; set; }
    public ReportDetailsConditionalView ConditionalView { get; set; }
    public List<ReportDetailsAnswerGroupValue> labels { get; set; }
}

public class Activity
{
    public string ActionType { get; set; }
    public DateTime ActionDate { get; set; }
}

public class Attachment
{
    public string Name { get; set; }
    public string FileType { get; set; }
    public byte[] Data { get; set; }
}

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ReportDetails, ComplaintDetailsModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Details.Id))
            .ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.Details.StatusName))
            .ForMember(
                dest => dest.CreatedDate,
                opt => opt.MapFrom(src => src.Details.ReportedDate)
            )
            .ForMember(
                dest => dest.Sections,
                opt => opt.MapFrom(src => src.Details.SubmittedJsonData.Fields)
            )
            .ForMember(
                dest => dest.History,
                opt => opt.MapFrom(src => src.Details.RecentActivities)
            );

        CreateMap<ReportDetailsRecentActivity, ComplaintHistory>()
            .ForMember(dest => dest.ActionType, opt => opt.MapFrom(src => src.ActionName))
            .ForMember(dest => dest.ActionDate, opt => opt.MapFrom(src => src.Date));

        CreateMap<ReportDetailsField, SectionsDetails>()
            .ForMember(dest => dest.arabicLabel, opt => opt.MapFrom(src => src.ArLabel))
            .ForMember(dest => dest.englishLabel, opt => opt.MapFrom(src => src.EnLabel))
            .ForMember(dest => dest.fields, opt => opt.MapFrom(src => src.Fields));

        CreateMap<ReportDetailsField, SectionFields>()
            .ForMember(dest => dest.fieldId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.fieldType, opt => opt.MapFrom(src => src.ControlType))
            .ForMember(dest => dest.arabicLabel, opt => opt.MapFrom(src => src.ArLabel))
            .ForMember(dest => dest.englishLabel, opt => opt.MapFrom(src => src.EnLabel))
            .ForMember(dest => dest.ConditionalView, opt => opt.MapFrom(src => src.ConditionalView))
            .ForMember(
                dest => dest.labels,
                opt => opt.MapFrom(src => src.GroupOfAnswers.AnswerGroupValues)
            )
            .ForMember(dest => dest.values, opt => opt.MapFrom(src => src.Values));
    }
}
