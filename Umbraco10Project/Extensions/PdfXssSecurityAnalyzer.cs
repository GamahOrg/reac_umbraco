using System.Text;
using Umbraco.Cms.Core.Security;

namespace Umbraco10Project.Helpers;

public class PdfXssSecurityAnalyzer : IFileStreamSecurityAnalyzer
{
    public bool ShouldHandle(Stream fileStream)
    {
        // Check if the file starts with PDF header
        var startBuffer = new byte[5]; // PDF files start with "%PDF-"
        fileStream.Seek(0, SeekOrigin.Begin);
        fileStream.Read(startBuffer, 0, startBuffer.Length);
        var startString = Encoding.UTF8.GetString(startBuffer);

        return startString.StartsWith("%PDF-");
    }

    public bool IsConsideredSafe(Stream fileStream)
    {
        // PDF files are binary, but XSS vulnerabilities could occur in embedded JavaScript.
        // Look for "JS" or "/JavaScript" references in the PDF content.

        using (var reader = new StreamReader(fileStream, Encoding.UTF8, true, leaveOpen: true))
        {
            var fileContent = reader.ReadToEnd();
            return !(fileContent.Contains("/JavaScript") || fileContent.Contains("JS(")|| fileContent.Contains("alert"));
        }
    }
}
