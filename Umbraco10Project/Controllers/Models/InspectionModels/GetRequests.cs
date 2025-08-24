using AutoMapper;
using Umbraco10Project.Models;

namespace Umbraco10Project.Controllers.Models.InspectionModels;

public class RequestSummary
{
    public int Id { get; set; }
    public string TypeName { get; set; }
    public string ActivityName { get; set; }
    public string FormName { get; set; }
    public string StatusName { get; set; }
    public string ReporterName { get; set; }
    public string AssignedUnitName { get; set; }
    public string AssignedSubUnitName { get; set; }
    public string AssignedRoleName { get; set; }
    public DateTime ReportedDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public bool IsEditable { get; set; }
    public bool IsDeletable { get; set; }
    public bool IsDue { get; set; }
    public string EventNo { get; set; }
}

public class RequestSummaryResponse
{
    public List<RequestSummary> Requests { get; set; } = new();
    public int TotalCount { get; set; }
}

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Event, RequestSummary>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.TypeName, opt => opt.MapFrom(src => src.TypeName))
            .ForMember(dest => dest.ActivityName, opt => opt.MapFrom(src => src.ActivityName))
            .ForMember(dest => dest.FormName, opt => opt.MapFrom(src => src.FormName))
            .ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.StatusName))
            .ForMember(dest => dest.ReporterName, opt => opt.MapFrom(src => src.ReporterName))
            .ForMember(dest => dest.AssignedUnitName, opt => opt.MapFrom(src => src.AssignedUnitName))
            .ForMember(dest => dest.AssignedSubUnitName, opt => opt.MapFrom(src => src.AssignedSubUnitName))
            .ForMember(dest => dest.AssignedRoleName, opt => opt.MapFrom(src => src.AssignedRoleName))
            .ForMember(dest => dest.ReportedDate, opt => opt.MapFrom(src => src.ReportedDate))
            .ForMember(dest => dest.LastUpdateDate, opt => opt.MapFrom(src => src.LastUpdateDate))
            .ForMember(dest => dest.IsEditable, opt => opt.MapFrom(src => src.IsEditable))
            .ForMember(dest => dest.IsDeletable, opt => opt.MapFrom(src => src.IsDeletable))
            .ForMember(dest => dest.IsDue, opt => opt.MapFrom(src => src.IsDue))
            .ForMember(dest => dest.EventNo, opt => opt.MapFrom(src => src.EventNo));
    }
}