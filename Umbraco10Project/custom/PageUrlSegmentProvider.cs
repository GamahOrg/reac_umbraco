using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Strings;

namespace Umbraco10Project.custom
{
    public class PageUrlSegmentProvider : IUrlSegmentProvider
    {
        private readonly IUrlSegmentProvider _provider;

        public PageUrlSegmentProvider(IShortStringHelper stringHelper)
        {
            _provider = new PageUrlSegmentProvider(stringHelper);
        }

        public string GetUrlSegment(IContentBase content, string? culture = null)
        {
            var segment = _provider.GetUrlSegment(content, culture);
            var productSku = content.Id;
            return $"aa--{productSku}".ToLower();
        }
    }
 
 
}
