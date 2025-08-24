using Newtonsoft.Json;
using Serilog;
using Umbraco.Cms.Core.Services;
using Umbraco10Project.Models;
using Umbraco10Project.Controllers;

public class BackgroundTaskManager
{
    private readonly IRuntimeState _runtimeState;
    private readonly IContentService _contentService;

    public BackgroundTaskManager(IRuntimeState runtimeState, IContentService contentService)
    {
        _runtimeState = runtimeState ?? throw new ArgumentNullException(nameof(runtimeState));
        _contentService = contentService ?? throw new ArgumentNullException(nameof(contentService));
    }

    public void RunBackgroundTask(EmailModel model, ServicesController ServicesController)
    {
        ThreadPool.QueueUserWorkItem(_ =>
        {
            var isDone = false;
            var count = 0;
            while (!isDone && count < 10)
            {
                try
                {
                    var stringifiedModel = JsonConvert.SerializeObject(model);
                    Log.Information("Sending email with this details: {model}", stringifiedModel);
                    ServicesController.SendEmail(model);
                    isDone = true;
                    Log.Information("Email sent successfully {emailTitle}", model.EmailSubject);
                }
                catch (Exception e)
                {
                    Log.Warning(e, "Trying again sending email try number: {count}", count);
                    count++;
                }
            }

            if (!isDone)
                Log.Error("Failed to send email after 10 tries check manually", model);
        });
    }
}