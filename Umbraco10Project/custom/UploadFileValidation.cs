using System.ComponentModel.DataAnnotations;

namespace Umbraco10Project.custom
{
    public class MaxFileSizeAttribute : ValidationAttribute
    {
        private readonly int _maxFileSize;

        public MaxFileSizeAttribute(int maxFileSize)
        {
            _maxFileSize = maxFileSize;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file != null)
            {
                if (file.Length > _maxFileSize)
                {
                    return new ValidationResult(ErrorMessageString);
                }
            }

            return ValidationResult.Success;
        }
    }


    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedExtensionsAttribute(string extensions)
        {
            _extensions = extensions.Split(',').Select(e => e.Trim().ToLower()).ToArray();
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file != null)
            {
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                if (!_extensions.Contains(fileExtension))
                {
                    return new ValidationResult(ErrorMessage ?? $"Only {string.Join(", ", _extensions)} files are allowed.");
                }
            }
            return ValidationResult.Success;
        }
    }


    public class AllowedFileContentAttribute : ValidationAttribute
    {
        private readonly string[] _allowedMimeTypes;
        private readonly Dictionary<string, byte[]> _fileSignatures = new Dictionary<string, byte[]>
    {
        { ".jpg", new byte[] { 0xFF, 0xD8, 0xFF } },  // JPEG signature
        { ".jpeg", new byte[] { 0xFF, 0xD8, 0xFF } }, // JPEG signature
        { ".png", new byte[] { 0x89, 0x50, 0x4E, 0x47 } }, // PNG signature
        { ".pdf", new byte[] { 0x25, 0x50, 0x44, 0x46 } }  // PDF signature
    };

        public AllowedFileContentAttribute(string allowedMimeTypes)
        {
            _allowedMimeTypes = allowedMimeTypes.Split(',').Select(m => m.Trim().ToLower()).ToArray();
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file != null)
            {
                // Validate MIME type
                if (!_allowedMimeTypes.Contains(file.ContentType.ToLower()))
                {
                    return new ValidationResult($"Invalid file type. Allowed types: {string.Join(", ", _allowedMimeTypes)}.");
                }

                // Validate file signature
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (_fileSignatures.ContainsKey(extension))
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var signature = new byte[_fileSignatures[extension].Length];
                        stream.Read(signature, 0, signature.Length);

                        if (!signature.SequenceEqual(_fileSignatures[extension]))
                        {
                            return new ValidationResult("File content does not match the expected type.");
                        }
                    }
                }
                else
                {
                    return new ValidationResult("Unsupported file format.");
                }
            }

            return ValidationResult.Success;
        }
    }
}