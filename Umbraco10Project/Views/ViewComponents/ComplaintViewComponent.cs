using System.IdentityModel.Tokens.Jwt;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco10Project.Models;
using Umbraco10Project.Services;
using uSync.Core;

namespace Umbraco10Project.Views.ViewComponents
{
    [ViewComponent(Name = "ComplaintForm")]
    public class ComplaintViewComponent() : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(FormModel formModel)
        {
            var model = new ComplaintModels();

            // string token = HttpContext.Session.GetString("accessToken");
            // string userInfo = HttpContext.Session.GetString("userInfo");
            //
            // if (string.IsNullOrWhiteSpace(userInfo))
            // {
            //     try
            //     {
            //         ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
            //         ServicePointManager.ServerCertificateValidationCallback += (
            //             sender,
            //             Certificate,
            //             chain,
            //             SslPolicyErrors
            //         ) => true;
            //         if (token == null)
            //             throw new Exception("Token is null");
            //
            //         var response = nafathService.GetUserInfo(token);
            //
            //         var jwtHandler = new JwtSecurityTokenHandler();
            //         var jsonToken = jwtHandler.ReadToken(response);
            //         var tokenS = jsonToken as JwtSecurityToken;
            //
            //         if (tokenS != null)
            //         {
            //             var user_info = tokenS
            //                 .Claims.FirstOrDefault(x => x.Type == "user_info")
            //                 .Value;
            //             JObject userInfoJson = JObject.Parse(user_info);
            //
            //             string name = userInfoJson.Value<string>("two_names#en");
            //             string idNumber = userInfoJson.Value<string>("id");
            //
            //             //view if true value
            //             string FirstName = userInfoJson.Value<string>("first_name#en");
            //             string LastName = userInfoJson.Value<string>("family_name#en");
            //
            //             model.FullName = name;
            //             model.IdNumber = idNumber;
            //
            //             model.FirstName = FirstName;
            //             model.LastName = LastName;
            //             HttpContext.Session.SetString("userNationalId", idNumber);
            //         }
            //     }
            //     catch (Exception ex)
            //     {
            //         var msg = ex.InnerException;
            //         Console.Error.Write(msg);
            //     }
            //
            //     /* get mobile number */
            //
            //
            //     string serialModelInfo = JsonConvert.SerializeObject(model);
            //     HttpContext.Session.SetString("userInfo", serialModelInfo);
            // }
            // else
            // {
            //     var userInfoModel = JsonConvert.DeserializeObject<ComplaintModels>(userInfo);
            //     model = userInfoModel;
            // }

            var x = HttpContext.Session.GetString("userInfo");
            if (x != null)
            {
                var userInfoModel = JsonConvert.DeserializeObject<ComplaintModels>(x);
                model = userInfoModel;
                model.FormID = formModel.FormID;
                model.ModelId = formModel.ModelId;
                model.Title = formModel.Title;
                model.Description = formModel.Description;
                model.ProtectedByNafath = formModel.ProtectedByNafath;
            }
         

            return View("ComplaintForm", model);
        }
    }
}