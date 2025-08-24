using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;

namespace Umbraco10Project.custom
{
    public interface IUrlProvider
    {
        UrlInfo? GetUrl(IPublishedContent content, UrlMode mode, string? culture, Uri current);
        IEnumerable<UrlInfo> GetOtherUrls(int id, Uri current);
    }
}
