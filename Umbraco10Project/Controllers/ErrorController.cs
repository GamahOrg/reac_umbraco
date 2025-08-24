using Microsoft.AspNetCore.Mvc;

namespace Umbraco10Project.Controllers
{

    public class ErrorController : Controller
    {
        [Route("Error")]
        public IActionResult Index()
        {
            if (Response.StatusCode == StatusCodes.Status500InternalServerError)
            {
                return Redirect("/statuscodes/500");
            }
            else if (Response.StatusCode != StatusCodes.Status200OK)
            {
                return Redirect("/statuscodes");
            }
            return Redirect("/");
        }
    }
}
