// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);

namespace Umbraco10Project.Models;

public class ReportDetailsAnswerGroupValue
{
    public string Id { get; set; }
    public string EnValue { get; set; }
    public string ArValue { get; set; }
    public string AnswerGroupId { get; set; }
    public string Weight { get; set; }
    public object ParentAnswerId { get; set; }
    public object ParentAnswerNameAr { get; set; }
    public object ParentAnswerNameEn { get; set; }
}

public class Condition
{
    public string LinkedFieldId { get; set; }
    public string ConditionType { get; set; }
    public string ValidatorValue { get; set; }
    public object EnErrorMsg { get; set; }
    public object ArErrorMsg { get; set; }
}

public class ReportDetailsConditionalView
{
    public string Action { get; set; }
    public string Operator { get; set; }
    public List<Condition> Conditions { get; set; }
}

public class Details
{
    public int Id { get; set; }
    public int TypeId { get; set; }
    public string TypeName { get; set; }
    public string ActivityId { get; set; }
    public string ActivityName { get; set; }
    public object CampaignId { get; set; }
    public string CampaignName { get; set; }
    public int LocationId { get; set; }
    public string LocationName { get; set; }
    public object AssetId { get; set; }
    public string AssetName { get; set; }
    public int FormId { get; set; }
    public string FormName { get; set; }
    public int StatusId { get; set; }
    public string StatusName { get; set; }
    public SubmittedJsonData SubmittedJsonData { get; set; }
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
    public string Score { get; set; }
    public int IssuesCount { get; set; }
    public int SolvedIssuesCount { get; set; }
    public int CriticalIssuesCount { get; set; }
    public List<object> Attachments { get; set; }
    public DateTime ReportedDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public bool IsResponsible { get; set; }
    public bool IsEditable { get; set; }
    public bool IsDeletable { get; set; }
    public bool IsDue { get; set; }
    public object DueDate { get; set; }
    public bool CalculateReadiness { get; set; }
    public string Longitude { get; set; }
    public string Latitude { get; set; }
    public object Duration { get; set; }
    public List<object> AvailableActions { get; set; }
    public List<ReportDetailsRecentActivity> RecentActivities { get; set; }
    public List<object> LinkedEvents { get; set; }
    public List<object> Conferences { get; set; }
    public bool CanReAssign { get; set; }
    public string EventNo { get; set; }
    public bool CanResetFlow { get; set; }
    public object Distance { get; set; }
}

public class ReportDetailsField
{
    public string Score { get; set; }
    public int IssueCount { get; set; }
    public int SolvedIssueCount { get; set; }
    public object Actions { get; set; }
    public object ReadinessIndicator { get; set; }
    public string ControlType { get; set; }
    public List<ReportDetailsField>? Fields { get; set; }
    public string Id { get; set; }
    public object TemplateQuestionId { get; set; }
    public string EnLabel { get; set; }
    public string ArLabel { get; set; }
    public int FieldOrder { get; set; }
    public object SectionId { get; set; }
    public ReportDetailsConditionalView ConditionalView { get; set; }
    public List<int> VisibilityView { get; set; }
    public List<object> LocationTypesVisibility { get; set; }
    public List<object> AssetTypesVisibility { get; set; }
    public object InstructionsPrimary { get; set; }
    public object InstructionsSecondary { get; set; }
    public bool EnableFlatAnswer { get; set; }
    public List<string> Values { get; set; }
    public object Note { get; set; }
    public object Attachment { get; set; }
    public string Weight { get; set; }
    public bool Issue { get; set; }
    public bool Solved { get; set; }
    public string Regex { get; set; }
    public string EntryLimit { get; set; }
    public object MinimumLength { get; set; }
    public object MaximumLength { get; set; }
    public object EnPlaceholder { get; set; }
    public object ArPlaceholder { get; set; }
    public bool Required { get; set; }
    public bool Disabled { get; set; }
    public bool HasAttachments { get; set; }
    public bool HasNotes { get; set; }
    public object ResponsibleUnit { get; set; }
    public object SeverityLevel { get; set; }
    public string Min { get; set; }
    public string Max { get; set; }
    public object Decimal { get; set; }
    public string Representation { get; set; }
    public object ViolationId { get; set; }
    public object AllowedRange { get; set; }
    public bool? Multiple { get; set; }
    public bool? EnableOther { get; set; }
    public object OtherScore { get; set; }
    public object LinkedParentFieldId { get; set; }
    public List<object> LinkedChildrenIds { get; set; }
    public ReportDetailsGroupOfAnswers? GroupOfAnswers { get; set; }
    public List<string> FileExtensions { get; set; }
}

public class ReportDetailsGroupOfAnswers
{
    public string Id { get; set; }
    public string EnName { get; set; }
    public string ArName { get; set; }
    public bool IsSystem { get; set; }
    public bool IsAvailableForAllUnits { get; set; }
    public int Status { get; set; }
    public int IsDeleted { get; set; }
    public int MaxValue { get; set; }
    public int MinValue { get; set; }
    public object ParentId { get; set; }
    public List<ReportDetailsAnswerGroupValue> AnswerGroupValues { get; set; }
    public int AnswerGroupValuesCount { get; set; }
    public bool CanEdit { get; set; }
    public List<object> UnitIds { get; set; }
}

public class ReportDetailsRecentActivity
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
    public List<object> Images { get; set; }
    public object DueDate { get; set; }
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
    public object AnswerId { get; set; }
}

public class ReportDetails
{
    public Details Details { get; set; }
}

public class SubmittedJsonData
{
    public List<ReportDetailsField> Fields { get; set; }
}
