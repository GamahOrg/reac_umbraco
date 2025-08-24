using Umbraco.Cms.Core.IO;

namespace Umbraco.Cms.Core.PropertyEditors;

[DataEditor(
    alias: "Suggestions editor",
    name: "Password",
    view: "~/App_Plugins/Suggestions/suggestion.html",
    Group = "Common",
    Icon = "icon-list")]
public class Suggestions : DataEditor
{
    public Suggestions(IDataValueEditorFactory dataValueEditorFactory)
        : base(dataValueEditorFactory)
    {
    }
}