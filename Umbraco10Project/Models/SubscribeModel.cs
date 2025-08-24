using System.ComponentModel.DataAnnotations;
using NewsletterStudio.Core.Backoffice.PropertyEditors.MailingListPicker.FrontendModels;

namespace Umbraco10Project.Models;

public class SubscribeModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    public bool status { get; set; }
    public string message { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    
    public List<MailingListPropertyEditorValueModel> MailingList { get; set; }

}