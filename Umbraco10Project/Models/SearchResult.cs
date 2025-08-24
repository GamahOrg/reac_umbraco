using Umbraco.Cms.Core.Models.PublishedContent;

namespace Umbraco10Project.Models;

public class SearchResult : PublishedContentWrapped
{
    public bool ShowResult { get; set; }
    public Dictionary<string, string> Header { get; set; }
    public Dictionary<string, string> Data { get; set; }
    public bool IsTable { get; set; }
    public string? resultPageId { get; set; }
    public string? resultPageParmKey { get; set; }
    public string? resultPageParmValue { get; set; }
    public string JsonString { get; init; }

    public SearchResult(IPublishedContent content, IPublishedValueFallback publishedValueFallback) : base(content,
        publishedValueFallback)
    {
        JsonString = "{}";
        Header = new Dictionary<string, string>();
        Data = new Dictionary<string, string>();
    }
}

public class SearchResultService(
    Dictionary<string, string> header,
    Dictionary<string, string> data,
    string jsonString = "{}",
    bool isTable = false,
    string? resultPageId = null,
    string? resultPageParmKey = null,
    string? resultPageParmValue = null)
{
    public Dictionary<string, string> Header { get; set; } = header;
    public Dictionary<string, string> Data { get; set; } = data;
    public string JsonString { get; set; } = jsonString;
    public string? resultPageId { get; set; } = resultPageId;
    public string? resultPageParmKey { get; set; } = resultPageParmKey;
    public string? resultPageParmValue { get; set; } = resultPageParmValue;
    public bool isTable { get; set; } = isTable;
}