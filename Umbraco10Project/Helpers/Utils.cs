using System.Text.Json;
using System.Text.RegularExpressions;
using HtmlAgilityPack;

namespace Umbraco10Project.Helpers
{
    public static class Utils
    {
        public static string TruncateAtWord(string textToTruncate, int length)
        {
            if (textToTruncate == null || textToTruncate.Length < length)

                return textToTruncate;

            int iNextSpace = textToTruncate.LastIndexOf(" ", length);

            return string.Format("{0}...", textToTruncate.Substring(0, (iNextSpace > 0) ? iNextSpace : length).Trim());
        }

        public static string MaskString(string name, int length)
        {
            if (string.IsNullOrEmpty(name) || length <= 0)
            {
                return new string('*', name.Length); // Return fully masked if name is empty or length is invalid
            }

            if (length >= name.Length)
            {
                return name; // Return as-is if the length is greater than or equal to the name length
            }

            // Keep the specified number of characters and mask the rest
            string unmaskedPart = name.Substring(0, length);
            string maskedPart = new string('*', name.Length - length);

            return unmaskedPart + maskedPart;
        }
        
        public static string MaskNameExceptFirstWord(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return name; // Return as-is if null or empty
            }
            string[] words = name.Split(' ');
            if (words.Length == 1)
            {
                return words[0]; // Return as-is if it's only one word
            }
            string firstWord = words[0];
            for (int i = 1; i < words.Length; i++)
            {
                words[i] = new string('*', words[i].Length);
            }
            return string.Join(' ', words);
        }

        public static string StripHTML(string input)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(input);
            var node = doc.DocumentNode;
            var results = node.ChildNodes;
            var textContent = node;
            return textContent.InnerText;
        }

        public static bool IsValidEmail(string email)
        {

            try
            {
                var rx = new Regex(@"^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$", RegexOptions.IgnoreCase);
                var isMatch = rx.Match(email);
                return isMatch.Success;
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
        
        public static string GetValueFronJson(JsonElement input, string key)
        {
            if (input.TryGetProperty(key, out JsonElement serviceTypeElement))
            {
                return serviceTypeElement.GetString() ?? "";
            }

            return "";
        }
        
    }
    
    public static class StringExtensions
    {
        public static bool IsNullOrEmptyString(this string input)
        {
            return string.IsNullOrEmpty(input);
        }
    }
    
   

}