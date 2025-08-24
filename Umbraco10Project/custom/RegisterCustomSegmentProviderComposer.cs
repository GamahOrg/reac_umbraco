using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Umbraco10Project.custom
{
    public class RegisterCustomSegmentProviderComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {

            builder.UrlSegmentProviders().Insert<PageUrlSegmentProvider>();
        }
    }
}
