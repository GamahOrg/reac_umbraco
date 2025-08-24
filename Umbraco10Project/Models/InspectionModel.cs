using System.Collections;

namespace Umbraco10Project.Models;

public class EventResponse
{
    public List<Event> Events { get; set; } = [];
    public int EventsCount { get; set; }
}

public class Event
{
    public int Id { get; set; }
    public int TypeId { get; set; }
    public string TypeName { get; set; }
    public Guid ActivityId { get; set; }
    public string ActivityName { get; set; }
    public int? CampaignId { get; set; }
    public string CampaignName { get; set; }
    public int LocationId { get; set; }
    public string LocationName { get; set; }
    public int? AssetId { get; set; }
    public string AssetName { get; set; }
    public int FormId { get; set; }
    public string FormName { get; set; }
    public int StatusId { get; set; }
    public string StatusName { get; set; }
    public string SubmittedJsonData { get; set; }
    public int ReportedUnitId { get; set; }
    public string ReportedUnitName { get; set; }
    public int ReporterId { get; set; }
    public string ReporterName { get; set; }
    public int AssignedUnit { get; set; }
    public string AssignedUnitName { get; set; }
    public int UnitRedirectionMode { get; set; }
    public int AssignedSubUnitId { get; set; }
    public string AssignedSubUnitName { get; set; }
    public int SubUnitRedirectionMode { get; set; }
    public int AssignedUser { get; set; }
    public string AssignedUserName { get; set; }
    public int AssignedRole { get; set; }
    public string AssignedRoleName { get; set; }
    public int ResponsibleUnitId { get; set; }
    public string ResponsibleUnitName { get; set; }
    public decimal Score { get; set; }
    public int IssuesCount { get; set; }
    public int SolvedIssuesCount { get; set; }
    public int CriticalIssuesCount { get; set; }
    public List<string> Attachments { get; set; } = new();
    public DateTime ReportedDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public bool IsResponsible { get; set; }
    public bool IsEditable { get; set; }
    public bool IsDeletable { get; set; }
    public bool IsDue { get; set; }
    public DateTime? DueDate { get; set; }
    public bool CalculateReadiness { get; set; }
    public string Longitude { get; set; }
    public string Latitude { get; set; }
    public TimeSpan? Duration { get; set; }
    public List<string> AvailableActions { get; set; } = new();
    public List<RecentActivity> RecentActivities { get; set; } = new();
    public List<object> LinkedEvents { get; set; } = new(); // Placeholder type
    public List<object> Conferences { get; set; } = new(); // Placeholder type
    public bool CanReAssign { get; set; }
    public string EventNo { get; set; }
    public bool CanResetFlow { get; set; }
    public double? Distance { get; set; }
}

public class RecentActivity
{
    public int EventId { get; set; }
    public int EventTypeId { get; set; }
    public string EventTypeName { get; set; }
    public string EventTypeImage { get; set; }
    public string EventLocation { get; set; }
    public string EventAsset { get; set; }
    public string ActionName { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string Note { get; set; }
    public List<string> Images { get; set; } = [];
    public DateTime? DueDate { get; set; }
    public int ActionBy { get; set; }
    public string ActionByName { get; set; }
    public int AssignedUnit { get; set; }
    public string AssignedUnitName { get; set; }
    public int AssignedSubUnitId { get; set; }
    public string AssignedSubUnitName { get; set; }
    public int AssignedRole { get; set; }
    public string AssignedRoleName { get; set; }
    public int AssignedUser { get; set; }
    public string AssignedUserName { get; set; }
    public int? AnswerId { get; set; }
}

public class GenericApiResponse<T>
{
    public string? ErrorEn { get; set; }
    public string? ErrorAr { get; set; }
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? FullName { get; set; }
    public string? IdNumber { get; set; }
    public string? JsFile { get; set; }
    public bool? ShouldRedirect { get; set; }
}

public class UploadImageDate
{
    public string ImageName { get; set; }
}

public class SubmitModel
{
    public string Id { get; set; }
    public string EventNo { get; set; }
}

public class UpdateModel
{
    public string? ErrorEn { get; set; }
    public string? ErrorAr { get; set; }
    public bool Success { get; set; }
    public object? Data { get; set; }
}

public class InspectionModel
{
    public List<Field>? Fields { get; set; }
}

public class InspectionModel2
{
    public List<ReportDetailsField> Fields { get; set; }
}

public class Field
{
    public ArrayList? Values = new ArrayList();
    public string? ReadinessIndicator { get; set; }
    public string? ControlType { get; set; }
    public bool? Multiple { get; set; }
    public string? Representation { get; set; }
    public bool? EnableOther { get; set; }
    public string? OtherScore { get; set; }
    public string? LinkedParentFieldId { get; set; }
    public List<string>? LinkedChildrenIds { get; set; }
    public GroupOfAnswers? GroupOfAnswers { get; set; }
    public string? ViolationId { get; set; }
    public string? EnPlaceholder { get; set; }
    public string? ArPlaceholder { get; set; }
    public bool? Required { get; set; }
    public bool? Disabled { get; set; }
    public bool? HasAttachments { get; set; }
    public bool? HasNotes { get; set; }
    public int? ResponsibleUnit { get; set; }
    public string? SeverityLevel { get; set; }
    public string? Id { get; set; }
    public string? TemplateQuestionId { get; set; }
    public string? EnLabel { get; set; }
    public string? ArLabel { get; set; }
    public int? FieldOrder { get; set; }
    public string? SectionId { get; set; }
    public ConditionalView? ConditionalView { get; set; }
    public List<object>? VisibilityView { get; set; }
    public List<object>? LocationTypesVisibility { get; set; }
    public List<object>? AssetTypesVisibility { get; set; }
    public string? InstructionsPrimary { get; set; }
    public string? InstructionsSecondary { get; set; }
    public bool? EnableFlatAnswer { get; set; }

    public List<Field> Fields { get; set; } // Sub-fields
}

public class GroupOfAnswers
{
    public string? Id { get; set; }
    public string? EnName { get; set; }
    public string? ArName { get; set; }
    public bool? IsSystem { get; set; }
    public bool? IsAvailableForAllUnits { get; set; }
    public int? Status { get; set; }
    public int? IsDeleted { get; set; }
    public int? MaxValue { get; set; }
    public int? MinValue { get; set; }
    public string? ParentId { get; set; }
    public List<AnswerGroupValue>? AnswerGroupValues { get; set; }
    public int? AnswerGroupValuesCount { get; set; }
    public bool? CanEdit { get; set; }
    public List<object>? UnitIds { get; set; }
}

public class AnswerGroupValue
{
    public string? Id { get; set; }
    public string? EnValue { get; set; }
    public string? ArValue { get; set; }
    public string? AnswerGroupId { get; set; }
    public int? Weight { get; set; }
    public string? ParentAnswerId { get; set; }
    public string? ParentAnswerNameAr { get; set; }
    public string? ParentAnswerNameEn { get; set; }
}

public class ConditionalView
{
    public string? Action { get; set; }
    public string? Operator { get; set; }
    public List<Conditions>? Conditions { get; set; }
}

public class Conditions
{
    public string? LinkedFieldId { get; set; }
    public string? ConditionType { get; set; }
    public string? ValidatorValue { get; set; }
    public string? EnErrorMsg { get; set; }
    public string? ArErrorMsg { get; set; }
}
