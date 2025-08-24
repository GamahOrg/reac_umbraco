using System.ComponentModel.DataAnnotations;
using MimeDetective;

namespace Umbraco10Project;

public class AllowedFileExtensionsAttribute : ValidationAttribute
{
    private readonly string[] _allowedExtensions = { ".mp4", ".webm", ".jpg", ".jpeg", ".png", ".pdf" };

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        // if there is no file, return success
        if (value == null)
            return ValidationResult.Success;
        if (value is List<IFormFile> files)
        {
            foreach (var file in files)
            {
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                // var fileMimeType = GetFileMimeType(file);
                // if it's picture, accept it else check if it's allowed extension

                if (!_allowedExtensions.Contains(fileExtension))
                    return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }

        return new ValidationResult("Invalid file type");
    }

    private string GetFileMimeType(IFormFile file)
    {
        using (var stream = file.OpenReadStream())
        {
            var Inspector = new ContentInspectorBuilder()
            {
                Definitions = MimeDetective.Definitions.Default.All()
            }.Build();
            var Results = Inspector.Inspect(stream);

            var ResultsByFileExtension = Results.ByFileExtension();
            var ResultsByMimeType = Results.ByMimeType();
            return ResultsByMimeType.First().MimeType;
        }
    }

}

public class MaxFileSizeAttribute(long maxFileSize) : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        // if there is no file, return success
        if (value == null)
            return ValidationResult.Success;
        if (value is List<IFormFile> files)
        {
            foreach (var file in files)
            {
                if (file.Length > maxFileSize)
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }

        return new ValidationResult("Invalid file type");
    }
}