using Microsoft.AspNetCore.Mvc;
using Umbraco10Project.Models;
using uSync.Core;

namespace Umbraco10Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpListenerController : ControllerBase
    {
        private readonly IConfiguration _configure;
        public SpListenerController(IConfiguration configuration)
        {
            _configure = configuration;
        }

        [HttpPost]
        //[Authorize("ApiKey")]
        public ActionResult  api([FromBody] SpListener obj )
        {   
            string maykey = _configure["variabels:ApiKey"];
            // 1. get random number
            // 2. User will be notified on Mobile app 
            // 3. User approve
            // application will pool nafath for access token every 5 seconds 
            // nafath also will send the access token for this endpoint 
            // either we use or we use the above one, each 5 seconds
            // check the request header of authuriztion key
            // make sure the value of the authuriztion key == "ApiKey 37dd2cdf-b684-4dde-ac57-890b2fde95cd"
            // other than this reject the request with 401 response 
            var apiKey = Request.Headers["ApiKey"];
            var authorization = Request.Headers["Authorization"];

            if (!string.IsNullOrWhiteSpace(apiKey))
            {
                // fJqjOobnqnWzwZNeKFkw = Ejar
                // QAjIuinqseaUGpigSuEs = Fal
                if (apiKey == maykey || apiKey == "ApiKey fJqjOobnqnWzwZNeKFkw" || apiKey == "ApiKey QAjIuinqseaUGpigSuEs")
                {
                    return Ok(new {success = true, message = "success"});
                    return Ok("response recevied successfully");
                }

                // if you want save for db for logs only 
            }
            else if (!string.IsNullOrWhiteSpace(authorization))
            {
                if (authorization == maykey || authorization == "ApiKey fJqjOobnqnWzwZNeKFkw" || authorization == "ApiKey QAjIuinqseaUGpigSuEs")
                {
                    return Ok(new {success = true, message = "success"});
                }
            }
            return Unauthorized();
        }
            
    }
}
