using Newtonsoft.Json;

namespace Umbraco10Project.Models
{
    public class CaptchaResponseViewModel
    {
        public bool Success { get; set; }

        [JsonProperty(PropertyName = "error-codes")]
        public IEnumerable<string> ErrorCodes { get; set; }

        [JsonProperty(PropertyName = "challenge-ts")]
        public DateTime ChallengeTime { get; set; }

        public string HostName { get; set; }
        public double Score { get; set; }
        public string Action { get; set; }
    }
}
