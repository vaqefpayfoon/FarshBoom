using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace RayaPardazCommon.Helpers
{
    public static class GeneralHelpers
    {
        public static string Truncate(this string str, int count)
        {

            if (str.Length < count)
                return str;
            else
            {
                str = str.Substring(0, count);
                var spaceIndex = str.LastIndexOf(" ");
                if (spaceIndex > -1)
                {
                    return str.Substring(0, spaceIndex) + " ...";
                }
                else
                {
                    return str;
                }
            }
        }
        public static string GetQueryString(this object obj)
        {
            var properties = from p in obj.GetType().GetProperties()
                             where p.GetValue(obj, null) != null
                             select p.Name + "=" + p.GetValue(obj, null).ToString();

            return string.Join("&", properties.ToArray());
        }
        public static string GetFileFormatRegx(string type)
        {
            switch (type)
            {
                case "Image":
                    return "/(jpg)|(jpeg)|(png)|(gif)$/i";
                case "Video":
                    return "/(mp4)$/i";
                case "Audio":
                    return "/(mp3)/i";
                case "Attachment":
                    return "/(pdf)|(doc?)|(xls?)|(jpg)|(jpeg)|(png)|(gif)$/i";
                default:
                    return "/(jpg)|(jpeg)|(png)|(gif)$/i";
            }
        }
        public static string DisplayName<T>(object option)
        {
            var enumType = typeof(T);
            var field = enumType.GetFields()
                       .FirstOrDefault(x => x.Name == Enum.GetName(enumType, option));

            if (field != null)
            {
                var attributes = field.GetCustomAttributes(typeof(DisplayAttribute), false);
                if (attributes.Any())
                {
                    var name = ((DisplayAttribute)attributes.First()).Name;
                    return name;
                }
            }
            return string.Empty;
        }
        public static string GetUserId(this IHttpContextAccessor httpContextAccessor)
        {
            if (!httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                return null;
            return httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        public static string GuidToBase64(Guid guid)
        {
            return Convert.ToBase64String(guid.ToByteArray()).Replace("/", "-").Replace("+", "_").Replace("=", "");
        }
        public static string GuidToBase64(string guid)
        {
            return Convert.ToBase64String(Guid.Parse(guid).ToByteArray()).Replace("/", "-").Replace("+", "_").Replace("=", "");
        }
        public static Guid Base64ToGuid(string base64)
        {
            Guid guid = default(Guid);
            base64 = base64.Replace("-", "/").Replace("_", "+") + "==";
            try
            {
                guid = new Guid(Convert.FromBase64String(base64));
            }
            catch (Exception ex)
            {
                string message = ex.Message;
            }
            return guid;
        }

        public static string ToShamsi(this DateTime datetime, bool reverse = false)
        {
            var pc = new PersianCalendar();
            var convertedDateTime = Convert.ToDateTime(datetime);
            var year = pc.GetYear(convertedDateTime).ToString();
            var month = pc.GetMonth(convertedDateTime).ToString().PadLeft(2, '0');
            var day = pc.GetDayOfMonth(convertedDateTime).ToString().PadLeft(2, '0');
            if (reverse)
                return $"{day}/{month}/{year}";
            else
                return $"{year}/{month}/{day}";

        }

        public static string ToShamsi(this DateTime? datetime, bool reverse = false)
        {
            if (!datetime.HasValue)
                return string.Empty;
            return ToShamsi(datetime.Value, reverse);
        }

        public static int ToShamsiYear(this DateTime datetime)
        {
            var pc = new PersianCalendar();
            var convertedDateTime = Convert.ToDateTime(datetime);
            return pc.GetYear(convertedDateTime);

        }
        public static int ToShamsiMonth(this DateTime datetime)
        {
            var pc = new PersianCalendar();
            var convertedDateTime = Convert.ToDateTime(datetime);
            var month = pc.GetMonth(convertedDateTime);

            return month;
        }

        public static int ToShamsiSeason(this DateTime datetime)
        {
            var pc = new PersianCalendar();
            var convertedDateTime = Convert.ToDateTime(datetime);
            var month = pc.GetMonth(convertedDateTime);

            if (month <= 3)
                return 1;
            else if (month <= 6 && month > 3)
                return 2;
            else if (month <= 9 && month > 6)
                return 3;
            else
                return 4;
        }
        public static int ToShamsiDay(this DateTime datetime)
        {
            var pc = new PersianCalendar();
            var convertedDateTime = Convert.ToDateTime(datetime);
            return pc.GetDayOfMonth(convertedDateTime);

        }
        public static DateTime? ToDateTime(this string shamsiDatetime)
        {
            try
            {
                var pc = new PersianCalendar();
                var splited = shamsiDatetime
                    .Replace('۱', '1')
                    .Replace('۲', '2')
                    .Replace('۳', '3')
                    .Replace('۴', '4')
                    .Replace('۵', '5')
                    .Replace('۶', '6')
                    .Replace('۷', '7')
                    .Replace('۸', '8')
                    .Replace('۹', '9')
                    .Replace('۰', '0')

                    .Split('/').Select(int.Parse).ToArray();
                return pc.ToDateTime(splited[0], splited[1], splited[2], 0, 0, 0, 0);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static TAttribute GetAttribute<TAttribute>(this Enum enumValue)
          where TAttribute : Attribute
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .First()
                            .GetCustomAttribute<TAttribute>();
        }

        public static DateTime FromShamsiDatetime(int year, int month, int day = 1)
        {
            var pc = new PersianCalendar();

            return pc.ToDateTime(year, month, day, 0, 0, 0, 0);

        }

        public static bool CanAddMonthlyReport(int year, int month)
        {
            var currentYear = DateTime.Now.ToShamsiYear();
            var currentMonth = DateTime.Now.ToShamsiMonth();

            if (year == currentYear)
            {
                if (month >= currentMonth)
                    return false;
            }
            if (year > currentYear)
            {
                return false;
            }
            return true;
        }

        public static bool CanAddSeasonalReport(int year, int season)
        {
            var currentYear = DateTime.Now.ToShamsiYear();
            var currentSeason = DateTime.Now.ToShamsiSeason();

            if (year == currentYear)
            {
                if (season >= currentSeason)
                    return false;
            }
            if (year > currentYear)
            {
                return false;
            }

            return true;
        }
    }


}
