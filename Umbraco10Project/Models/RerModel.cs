namespace Umbraco10Project.Models;

public class RerRegistrarQueryParms
{
    public string ModelUrl { get; set; }
    public int CurrentPage { get; set; }
    public string LicenseNumber { get; set; }
    public int PageSize { get; set; } = 20;

}

public class RerTitleInquiryQueryParms
{
    public string ModelUrl { get; set; }
    public string RealEstateNumber { get; set; }
    public string? FirstRegistrationDate { get; set; }
    public string? IdNumber { get; set; }

}

public class RerRegistrarModel
{
    public string Title { get; set; }
    public bool ShowController { get; set; }
    public bool ShowAlert { get; set; }
    public RerRegistrarQueryParms QueryParm { get; set; }
    public RerRegistrarLicenseResponse response { get; set; }
}
public class RerTitleInquiryModel
{
    public string Title { get; set; }
    public bool ShowController { get; set; }
    public bool ShowAlert { get; set; }
    public RerTitleInquiryQueryParms QueryParm { get; set; }
    public RerTitleInquiryResponse response { get; set; }
}

public class RerRegistrarLicense
{
    public string Name { get; set; }
    public DateTime? issuance_date { get; set; }
    public DateTime? expire_date { get; set; }
    public string license_number { get; set; }
    public string license_status { get; set; }
}


public class RerRegistrarLicenseResponse
{
    public int Page { get; set; }
    public int Limit { get; set; }
    public int TotalCount { get; set; }
    public List<RerRegistrarLicense>? Data { get; set; }
}

public class OriginMojDeed
{
    public string? Number { get; set; }
    public string? Date { get; set; }
    public string? LastSerialNumber { get; set; }
}

public class Currency
{
    public string? Code { get; set; }
}

public class SellingPrice
{
    public int? Amount { get; set; }
    public Currency? Currency { get; set; }
    public string? CurrencyCode { get; set; }
}

public class GeneralInformation
{
    public string? RealEstateNumber { get; set; }
    public int? Version { get; set; }
    public string? VersionDateH { get; set; }
    public string? VersionDateG { get; set; }
    public string? FirstRegistrationDateH { get; set; }
    public string? FirstRegistrationDateG { get; set; }
    public string? OwnershipDateH { get; set; }
    public string? OwnershipDateG { get; set; }
    public string? ParentRealEstateNumber { get; set; }
    public string? UndevidedShareOfLand { get; set; }
}

public class Address
{
    public string? CityCode { get; set; }
    public string? CityNameAr { get; set; }
    public string? CityNameEn { get; set; }
    public string? ParcelNumber { get; set; }
    public string? BlockNumber { get; set; }
    public string? PlanNumber { get; set; }
    public string? DistrictNameAr { get; set; }
    public string? DistrictNameEn { get; set; }
    public string? DistrictCode { get; set; }
    public string? UnitNumber { get; set; }
}

public class Spatial
{
    public int? AreaSize { get; set; }
    public string? PropertyType { get; set; }
    public string? PropertyUse { get; set; }
    public int? PropertyUseCode { get; set; }
    public string? PropertyStatus { get; set; }
    public string? PropertyStatusCode { get; set; }
    public string? BuildingAvailability { get; set; }
}

public class OwnerInformation
{
    public string? Type { get; set; }
    public int? TypeCode { get; set; }
    public string? OwnerType { get; set; }
    public string? IdentityType { get; set; }
    public int? IdentityTypeCode { get; set; }
    public string? Id { get; set; }
    public string? NameAr { get; set; }
    public string? NameEn { get; set; }
    public string? DateOfBirthH { get; set; }
    public string? DateOfBirthG { get; set; }
    public string? NationalityCode { get; set; }
    public string? Nationality { get; set; }
    public string? OwnerShare { get; set; }
    public string? OwningArea { get; set; }
}

public class BorderInfo
{
    public string? Direction { get; set; }
    public int? DirectionCode { get; set; }
    public string? Type { get; set; }
    public int? TypeCode { get; set; }
    public string? Length { get; set; }
}

public class RerTitleInquiryResponse
{
    public string? Status { get; set; }
    public int? StatusCode { get; set; }
    public OriginMojDeed? OriginMojDeed { get; set; }
    public List<OriginMojDeed>? OriginMojDeeds { get; set; }
    public SellingPrice? SellingPrice { get; set; }
    public GeneralInformation? GeneralInformation { get; set; }
    public Address? Address { get; set; }
    public object? UnitDetails { get; set; }
    public Spatial? Spatial { get; set; }
    public List<OwnerInformation>? OwnerInformation { get; set; }
    public List<BorderInfo>? BorderInfo { get; set; }
    public bool? IsConfidential { get; set; }
    public bool? IsPublished { get; set; }
    public List<object>? RrRs { get; set; }
}
