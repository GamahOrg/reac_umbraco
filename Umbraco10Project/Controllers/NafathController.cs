using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco10Project.Models;
using Umbraco10Project.Services;

namespace Umbraco10Project.Controllers
{
    [IgnoreAntiforgeryToken]
    public class NafathController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        NafathService nafathService
    )
        : SurfaceController(
            umbracoContextAccessor,
            databaseFactory,
            services,
            appCaches,
            profilingLogger,
            publishedUrlProvider
        )
    {
        public IActionResult Login(string? id)
        {
            var regexTemplate = "^[0-9]{10}$";
            if (id != null && !Regex.IsMatch(id, regexTemplate))
            {
                // return error
                Log.Error(
                    "NAFATH Login Request, Invalid id format, please make sure to enter a valid id: "
                        + id
                );
                return BadRequest(
                    new { message = "Invalid id format, please make sure to enter a valid id" }
                );
            }

            try
            {
                var data = new LoginNafath()
                {
                    Action = "SpRequest",
                    Parameters = new RequestParameters() { service = "AdvancedLogin", id = id },
                };
                // store in session
                var response = nafathService.Login(data);
                var newObject = new
                {
                    response, // This includes the response object
                    id // Add the id property
                    ,
                };
                HttpContext.Session.SetString(
                    "nafathLoginRequest",
                    JsonConvert.SerializeObject(newObject)
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                var message = ex.ToString();
                // write the error to console
                Log.Error(message);
                throw new Exception("Error while trying to login to NAFATH");
            }
        }

        [HttpGet]
        public IActionResult SetToken()
        {
            try
            {
                // get from response from session
                var nafathResponse = HttpContext.Session.GetString("nafathLoginRequest");
                if (string.IsNullOrWhiteSpace(nafathResponse))
                    return BadRequest(new { message = "Invalid request" });

                var parsedNafathResponse = JObject.Parse(nafathResponse);
                var response = parsedNafathResponse["response"];
                if (response == null)
                    return BadRequest(new { message = "Invalid request" });

                var transId = response["transId"].ToString();
                var randomValue = response["random"].ToString();
                var idValue = parsedNafathResponse.Value<string>("id");
                if (
                    string.IsNullOrWhiteSpace(transId)
                    || string.IsNullOrWhiteSpace(randomValue)
                    || string.IsNullOrWhiteSpace(idValue)
                )
                    return BadRequest(new { message = "Invalid request" });

                var data = new LoginNafath()
                {
                    Action = "CheckSpRequest",
                    Parameters = new RequestParameters()
                    {
                        transId = transId,
                        random = randomValue,
                        id = idValue,
                    },
                };

                JObject jres = JObject.Parse(nafathService.Check(data));
                string accessToken = jres.Value<string>("accessToken");
                if (accessToken != null)
                {
                    try
                    {
                        var userInfoResponse = nafathService.GetUserInfo(accessToken);
                        var jwtHandler = new JwtSecurityTokenHandler();
                        var jsonToken = jwtHandler.ReadToken(userInfoResponse);
                        var tokenS = jsonToken as JwtSecurityToken;
                        var model = new ComplaintModels();

                        if (tokenS != null)
                        {
                            var user_info = tokenS
                                .Claims.FirstOrDefault(x => x.Type == "user_info")
                                .Value;
                            JObject userInfoJson = JObject.Parse(user_info);
                            string name = userInfoJson.Value<string>("two_names#ar");
                            string idNumber = userInfoJson.Value<string>("id");

                            //view if true value
                            string FirstName = userInfoJson.Value<string>("first_name#ar");
                            string LastName = userInfoJson.Value<string>("family_name#ar");

                            model.FullName = name;
                            model.IdNumber = idNumber;

                            model.FirstName = FirstName;
                            model.LastName = LastName;
                            HttpContext.Session.SetString("userNationalId", idNumber);
                            HttpContext.Session.SetString("fullName", name);
                            HttpContext.Session.SetString("accessToken", accessToken);
                            string serialModelInfo = JsonConvert.SerializeObject(model);
                            HttpContext.Session.SetString("userInfo", serialModelInfo);
                        }
                    }
                    catch (Exception ex)
                    {
                        var msg = ex.InnerException;
                        Console.Error.Write(msg);
                    }
                }

                string? status = jres.Value<string>("status");

                return Ok(new { status });
            }
            catch (Exception ex)
            {
                var message = ex.ToString();
                Log.Error(message);
            }

            return Ok(new { status = "COMPLETED" });
        }
    }
}
