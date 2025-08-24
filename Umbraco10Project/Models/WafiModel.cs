using Umbraco.Cms.Core.Models.PublishedContent;

namespace Umbraco10Project.Models;

public class WafiModel
{
    public string Title { get; set; }
    public string ResultPage { get; set; }
    public bool ShowController { get; set; }
    public bool ShowAlert { get; set; }
    public WafiProjectQueryParms QueryParm { get; set; }
    public WafiProjectList response { get; set; }
    public WafiCityList? cityList { get; set; }
    public WafiLicenseRequestTypes? licenseRequestType { get; set; }
}

public class WafiProjectQueryParms
{
    public string ModelUrl { get; set; }
    public int CurrentPage { get; set; }
    public string CityId { get; set; }
    public string LicenseRequestTypeId { get; set; }
    public int PageSize { get; set; } = 20;

}

public class WafiDeveloperQueryParms
{
    public string QualificationTypeId { get; set; }
    public int CurrentDeveloperPage { get; set; }
    public string FacilityName { get; set; }
    public string ModelUrl { get; set; }
    public int PageSize { get; set; } = 20;
}

public class WafiProjectDetailsModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
    : PublishedContentWrapped(content,
        publishedValueFallback)
{
    public bool ShowResult { get; set; }
    public WafiProjectDetails response { get; set; }
}

public class WafiDevelopersModel
{
    public string Title { get; set; }
    public bool ShowController { get; set; }
    public bool ShowAlert { get; set; }
    public WafiDeveloperQueryParms QueryParm { get; set; }

    public CertifiedFacilities Response { get; set; }

    public WafiQualificationTypes? QualificationTypes { get; set; }
}

public class WafiProjectDetails
{
    public ProjectDetailsData Data { get; set; }
    public bool IsDone { get; set; }
    public string Message { get; set; }
}

public class WafiProjectList
{
    public WafiProjectListData Data { get; set; }
    public bool IsDone { get; set; }
    public string Message { get; set; }
}

public class WafiCityList
{
    public List<WafiCityListData> Data { get; set; }
    public bool IsDone { get; set; }
    public string Message { get; set; }
}



public class WafiLicenseRequestTypes
{
    public List<WafiLicenseRequestTypeData>? Data { get; set; }
    public bool IsDone { get; set; }
    public string Message { get; set; }
}

public class WafiQualificationTypes
{
    public List<WafiQualificationTypeData>? Data { get; set; }
    public bool IsDone { get; set; }
    public string Message { get; set; }
}

public class WafiLicenseRequestTypeData
{
    public string name { get; set; }
    public string typeCode { get; set; }
    public string id { get; set; }
}

public class WafiQualificationTypeData
{
    public string typeName { get; set; }
    public string typeCode { get; set; }
    public string id { get; set; }
}

public class WafiCityListData
{
    public string cityName { get; set; }
    public string areasId { get; set; }
    public string id { get; set; }
}

public class WafiProjectTypeData
{
    public string name { get; set; }
    public int id { get; set; }
}

public class ProjectDetailsData
{
    public Guid LicenseProjectId { get; set; }
    public string? CertificateNumber { get; set; }
    public string? ProjectName { get; set; }
    public string? FacilityName { get; set; }
    public string? AreaName { get; set; }
    public string? CityName { get; set; }
    public string? LicenseProjectStatusName { get; set; }
    public string? LicenseProjectTypeName { get; set; }
    public string? LicenseRequestTypeName { get; set; }
    public List<string>? LicenseProjectSubUnitType { get; set; }
    public string? ProjectDescription { get; set; }
    public string? CommercialRegisterNumber { get; set; }
    public string? ChartedAccountantName { get; set; }
    public string? ChartedProjectConsultantName { get; set; }
    public int? AchievementRate { get; set; }
    public double? TotalAreaSizeForProject { get; set; }
    public int? SubUnitCount { get; set; }
    public DateTime? LicenseStartDate { get; set; }
    public DateTime? LicenseEndDate { get; set; }
    public DateTime? ProjectStartDate { get; set; }
    public DateTime? ProjectEndDate { get; set; }
    public string? NeighborhoodName { get; set; }
    public string? BankName { get; set; }
    public string? AccountNumber { get; set; }
}

public class WafiProjectListData
{
    public List<Result> Results { get; set; }
    public int CurrentPage { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
}

public class Result
{
    public Guid LicenseProjectId { get; set; }
    public string CertificateNumber { get; set; }
    public string ProjectName { get; set; }
    public string FacilityName { get; set; }
    public string AreaName { get; set; }
    public string CityName { get; set; }
    public string LicenseProjectStatusName { get; set; }
    public string LicenseRequestTypeName { get; set; }
    public List<string> LicenseProjectSubUnitType { get; set; }
    public string ProjectDescription { get; set; }
}

public class CertifiedFacilities
{
    public CertifiedFacilitiesData? Data { get; set; }
    public bool IsDone { get; set; }
    public string Message { get; set; }
}

public class CertifiedFacilitiesData
{
    public List<CertifiedFacilitiesResult>? Results { get; set; }
    public int CurrentPage { get; set; }
    public int PageCount { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
}

public class CertifiedFacilitiesResult
{
    public Guid Id { get; set; }
    public string FacilityName { get; set; }
    public string CertificateNumber { get; set; }
    public string QualificationTypeName { get; set; }
    public DateTime QulificationStartDate { get; set; }
    public DateTime QulificationEndDate { get; set; }
    public string StatusName { get; set; }
    public string CityName { get; set; }
}