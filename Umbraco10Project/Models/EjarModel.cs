using System;
using System.Collections.Generic;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace Umbraco10Project.Models;

public class EjarQueryParms
{
    public string ModelUrl { get; set; }

    public string IdNumber { get; set; }
    public string BirthDateHijri { get; set; }

}

public class EjarInquiryModel
{
    public string Title { get; set; }
    public bool ShowController { get; set; }
    public string ResultPage { get; set; }

    public bool ShowAlert { get; set; }
    public EjarQueryParms QueryParm { get; set; }
    public EjarContractResponse response { get; set; }
}

public class EjarContractDetailsModel(IPublishedContent content, IPublishedValueFallback publishedValueFallback)
    : PublishedContentWrapped(content,
        publishedValueFallback)
{
    public bool ShowResult { get; set; }
    public EjarContractDetailsResponse response { get; set; }
}



public class EjarContractResponse
{
    public EjarContractResponseHeader? Header { get; set; }
    public EjarContractResponseBody? Body { get; set; }
}

public class EjarContractResponseHeader
{
    public DateTime? ResTime { get; set; }
    public string? ChId { get; set; }
    public string? RefId { get; set; }
    public string? ReqID { get; set; }
    public EjarContractResponseStatus? Status { get; set; }
}

public class EjarContractResponseStatus
{
    public int? Code { get; set; }
    public string? Description { get; set; }
}

public class EjarContractResponseBody
{
    public List<Contract>? Contracts { get; set; }
}

public class Contract
{
    public string? contract_number { get; set; }
    public string? contract_status { get; set; }
    public string? Version { get; set; }
    public int? major_version { get; set; }
    public int? minor_version { get; set; }
    public bool? IsMainTenant { get; set; }
    public string? RequestedRole { get; set; }
    public string? contract_start_date_greg { get; set; }
    public string? contract_end_date_greg { get; set; }
    public string? ContractAmount { get; set; }
    public List<Tenant>? Tenants { get; set; }
    public List<TenantOrganization>? TenantOrganizations { get; set; }
    public List<Lessor>? Lessors { get; set; }
    public List<LessorOrganization>? LessorOrganizations { get; set; }
    public PropertyWrapper? Property { get; set; }
    public List<Unit>? Units { get; set; }
    public List<Owner>? Owners { get; set; }
    public List<Resident>? Residents { get; set; }
}

public class Tenant
{
    public string? IdType { get; set; }
    public int? IdTypeNumber { get; set; }
    public string? IdValue { get; set; }
    public string? DateOfBirthHijri { get; set; }
    public string? Name { get; set; }
}

public class TenantOrganization
{
    // Add properties as needed
}

public class Lessor
{
    public string? IdType { get; set; }
    public int? IdTypeNumber { get; set; }
    public string? IdValue { get; set; }
    public string? DateOfBirthHijri { get; set; }
    public string? Name { get; set; }
}

public class LessorOrganization
{
    public string? OrganizationType { get; set; }
    public string? RegistrationNumber { get; set; }
    public string? Name { get; set; }
}

public class PropertyWrapper
{
    public Property? Property { get; set; }
}

public class Property
{
    public EjarContractResponseAddress? Address { get; set; }
    public string? DeedNumber { get; set; }
    public DateTime? DeedIssueDateGreg { get; set; }
}

public class EjarContractResponseAddress
{
    public RegionObj? region_obj { get; set; }
    public CityObj? city_obj { get; set; }
    public DistrictObj? district_obj { get; set; }
    public string? BuildingNumber { get; set; }
    public string? StreetName { get; set; }
    public string? PostalCode { get; set; }
    public string? AdditionalNumber { get; set; }
    public string? District { get; set; }
    public string? City { get; set; }
    public string? Region { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public int? CityId { get; set; }
    public int? RegionId { get; set; }
    public int? DistrictId { get; set; }
    public bool? IsVirtual { get; set; }
}

public class RegionObj
{
    public string? name_ar { get; set; }
    public string? NameEn { get; set; }
    public double? Lat { get; set; }
    public double? Lon { get; set; }
    public string? Key { get; set; }
    public int? RegionId { get; set; }
}

public class CityObj
{
    public int? CityId { get; set; }
    public int? ProvinceId { get; set; }
    public int? RegionId { get; set; }
    public string? name_ar { get; set; }
    public string? NameEn { get; set; }
    public int? RedfCode { get; set; }
    public double? Lat { get; set; }
    public double? Lon { get; set; }
    public int? Classification { get; set; }
}

public class DistrictObj
{
    public int? Id { get; set; }
    public int? CityId { get; set; }
    public string? name_ar { get; set; }
    public string? NameEn { get; set; }
    public double? Lat { get; set; }
    public double? Lon { get; set; }
}

public class Unit
{
    public string? UnitNumber { get; set; }
    public string? UnitType { get; set; }
    public DateTime? DeedIssueDateGreg { get; set; }
    public string? ElectricityMeterNo { get; set; }
    public string? WaterMeterNo { get; set; }
    public string? GasMeterNo { get; set; }
}

public class Owner
{
    // Add properties as needed
}

public class Resident
{
    public string? IdType { get; set; }
    public int? IdTypeNumber { get; set; }
    public string? IdValue { get; set; }
    public string? Name { get; set; }
    public string? Relation { get; set; }
}



public class EjarContractDetailsResponse
{
    public Header? Header { get; set; }
    public EjarContractDetailsBody? Body { get; set; }
}

public class EjarContractDetailsBody
{
    public string? contract_no { get; set; }
    public string? VersionNumber { get; set; }
    public int? MajorVersion { get; set; }
    public int? MinorVersion { get; set; }
    public string? contract_type { get; set; }
    public string? contract_date { get; set; }
    public DateTime? ContractTerminationDate { get; set; }
    public string? contract_start_date { get; set; }
    public string? contract_end_date { get; set; }
    public DateTime? ContractWaiverDate { get; set; }
    public DateTime? ContractRevokeDate { get; set; }
    public int? contract_duration { get; set; }
    public string? contract_status { get; set; }
    public Location? ContractSealingLocation { get; set; }
    public Location? contract_building_location { get; set; }
    public bool? IsExecutive { get; set; }
    public bool? IsUnifiedContract { get; set; }
    public RenewalInformation? RenewalInformation { get; set; }
    public List<EjarContractDetailsLessor>? Lessors { get; set; }
    public LessorRepresentative? LessorRepresentative { get; set; }
    public EjarContractDetailsTenant? Tenant { get; set; }
    public TenantRepresentative? TenantRepresentative { get; set; }
    public List<PreviousOwner>? PreviousOwners { get; set; }
    public List<DuePayment>? DuePayments { get; set; }
    public List<SecRequest>? SecRequests { get; set; }
    public List<NwcRequest>? NwcRequests { get; set; }
}

public class Location
{
    public District? District { get; set; }
    public City? City { get; set; }
    public Region? Region { get; set; }
}

public class District
{
    public int? Id { get; set; }
    public string? name_ar { get; set; }
    public string? NameEn { get; set; }
}

public class City
{
    public int? CityId { get; set; }
    public string? name_ar { get; set; }
    public string? NameEn { get; set; }
    public int? ProvinceId { get; set; }
    public int? RegionId { get; set; }
}

public class Region
{
    public int? RegionId { get; set; }
    public string? name_ar { get; set; }
    public string? NameEn { get; set; }
}

public class RenewalInformation
{
    public bool? IsLatestVersion { get; set; }
    public bool? ContractIsAutoRenewable { get; set; }
    public DateTime? AutoRenewalCancelDate { get; set; }
    public string? ReasonOfAutoRenewalCancel { get; set; }
}

public class EjarContractDetailsLessor
{
    public string? PartyRole { get; set; }
    public string? party_type { get; set; }
    public string? lessor_name { get; set; }
    public string? LessorFirstName { get; set; }
    public string? LessorMiddleName { get; set; }
    public string? LessorGrandFatherName { get; set; }
    public string? LessorLastName { get; set; }
    public string? lessor_nationality { get; set; }
    public string? LessorIdType { get; set; }
    public string? LessorIdNumber { get; set; }
    public string? LessorContactNumber { get; set; }
    public string? LessorHijriDateOfBirth { get; set; }
    public string? PermissionType { get; set; }
    public DateTime? PermissionIssueDate { get; set; }
    public string? PermissionNo { get; set; }
}

public class LessorRepresentative
{
    public string? OwnerIdType { get; set; }
    public string? OwnerIdNumber { get; set; }
    public string? RepresentativeName { get; set; }
    public string? OwnerType { get; set; }
}

public class EjarContractDetailsTenant
{
    public string? PartyRole { get; set; }
    public string? party_type { get; set; }
    public string? TenantIdType { get; set; }
    public string? TenantIdNumber { get; set; }
    public string? tenant_name { get; set; }
    public string? TenantMobileNumber { get; set; }
    public string? TenantBirthDate { get; set; }
    public string? TenantNationality { get; set; }
    public string? PermissionType { get; set; }
    public DateTime? PermissionIssueDate { get; set; }
    public string? PermissionNo { get; set; }
}

public class TenantRepresentative
{
    public string? TenantRepresentativeIdType { get; set; }
    public string? TenantRepresentativeIdNumber { get; set; }
    public string? TenantRepresentativeName { get; set; }
    public string? TenantRepresentativeType { get; set; }
}

public class PreviousOwner
{
    // Add properties as needed
}

public class DuePayment
{
    public string? PaymentScheduleSequenceNumber { get; set; }
    public int? SequenceNumber { get; set; }
    public string? InvoiceAmount { get; set; }
    public string? InvoiceRemainingAmount { get; set; }
    public string? InvoiceDueDate { get; set; }
    public string? InvoiceIssueDate { get; set; }
}

public class SecRequest
{
    // Add properties as needed
}

public class NwcRequest
{
    // Add properties as needed
}
