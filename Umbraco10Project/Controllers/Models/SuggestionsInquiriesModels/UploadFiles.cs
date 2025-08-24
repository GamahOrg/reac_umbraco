namespace Umbraco10Project.Controllers.Models.SuggestionsInquiriesModels;
using Umbraco10Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.custom;

public class UploadFileRequest
{

    [FromForm(Name = "attachments")]
    public string attachmentJson { get; set; }
    [FromForm(Name = "attachments")]
    [AllowedExtensions(".jpg,.png,.pdf,.jpeg", ErrorMessage = "Only .jpg, .png, .jpeg, and .pdf files are allowed.")]
    [MaxFileSize(10 * 1024 * 1024, ErrorMessage = "The file size should not exceed 10 MB.")]
    [AllowedFileContent("image/jpeg,image/jpg,image/png,application/pdf")]
    public IFormFile attachmentFile { get; set; }

}
