using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Umbraco10Project.Helpers.Attributes;

public class CheckNafathAccessAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var idNumber = context.HttpContext.Session.GetString("userNationalId");
        if (string.IsNullOrEmpty(idNumber))
        {
            context.Result = new UnauthorizedObjectResult(new
            {
                message = "Unauthorized",
                status = 401
            });
        }

        base.OnActionExecuting(context);
    }
}