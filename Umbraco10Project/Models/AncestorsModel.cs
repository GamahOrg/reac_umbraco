using Umbraco.Cms.Core.Models.PublishedContent;

namespace Umbraco10Project.Models;

public class AncestorsModel
{
    public List<IPublishedContent> ancestors { get; set; }
    public IPublishedContent content { get; set; }
    public string title { get; set; }
    public bool? disableRoot { get; set; }
    public bool? ActionPushToEnd { get; set; }

    public List<AncestorsActionModel> action { get; set; }
}

public class AncestorsActionModel
{
    public string Text { get; set; }
    public string? Url { get; set; }

    public bool? PushToEnd { get; set; }
    public bool? Outline { get; set; }
}