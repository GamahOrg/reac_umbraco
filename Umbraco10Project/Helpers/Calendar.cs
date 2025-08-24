using System.Globalization;

namespace Umbraco10Project.Helpers;

public static class Calendar
{
    public static string ConvertToHijri(DateTime? dateTime)
    {
        HijriCalendar hijriCalendar = new HijriCalendar();
        if (dateTime == null) return "";
        // Convert DateTime to Hijri date parts
        var hijriYear = hijriCalendar.GetYear((DateTime)dateTime);
        var hijriMonth = hijriCalendar.GetMonth((DateTime)dateTime);
        var hijriDay = hijriCalendar.GetDayOfMonth((DateTime)dateTime);

        // Format the Hijri date as a string
        return $"{hijriYear}/{hijriMonth:D2}/{hijriDay:D2}";
    }

    public static string TheDate(DateTime date, bool isEnglish)
    {
        if (date != DateTime.MinValue)
        {
            if (isEnglish)
            {
                date.ToString("yyyy - MMM - dd");
                return date.ToString("yyyy - MMM - dd");
            }
            else
            {
                string oldMonth = date.ToString("MMMM", new System.Globalization.CultureInfo("en-US"));
                string[] englishMonths =
                {
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
                    "November", "December"
                };
                string[] arabicMonths =
                {
                    "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر",
                    "ديسمبر"
                };
                var newMonth = englishMonths.IndexOf(oldMonth);
                var arabicMonth = arabicMonths[newMonth];
                var year = date.ToString("yyyy");
                var day = date.ToString("dd");
                var theDate = $"{day} - {arabicMonth} - {year}";
                return theDate;
            }
        }

        return "";
    }

    public static string TheSmallDate(DateTime? date, bool isEnglish)
    {
        if (date == null)
        {
            return "";
        }

        if (date == DateTime.MinValue) return "";
        if (isEnglish)
        {
            return ((DateTime)date!).ToString("yyyy - MMM - dd");
        }

        var oldMonth = ((DateTime)date!).ToString("MMMM", new System.Globalization.CultureInfo("en-US"));
        string[] englishMonths =
        [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
            "November", "December"
        ];
        string[] arabicMonths =
        [
            "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر",
            "ديسمبر"
        ];
        var newMonth = englishMonths.IndexOf(oldMonth);
        var arabicMonth = arabicMonths[newMonth];
        var year = ((DateTime)date!).ToString("yyyy");
        var day = ((DateTime)date!).ToString("dd");
        var theDate = $"{day} {arabicMonth} {year}";
        return theDate;
    }
    
    public static string FormatHijriDate(string hijriDateString, string outputFormat = "dd-MM-yyyy")
    {
        // Define the Hijri culture
        CultureInfo hijriCulture = new CultureInfo("ar-SA");
        hijriCulture.DateTimeFormat.Calendar = new HijriCalendar();
        
        // Define the format for the Hijri date
        string inputFormat = "yyyy/MM/dd";
        
        // Parse the date string
        DateTime dateTime = DateTime.ParseExact(hijriDateString, inputFormat, hijriCulture, DateTimeStyles.None);
        
        // Format to the desired output format
        return dateTime.ToString(outputFormat, hijriCulture);
    }
}