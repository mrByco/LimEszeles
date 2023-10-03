using System;
using System.Runtime.InteropServices;
using System.Text.Json.Serialization;
using margarita_data.Models;



namespace margarita_data.Models
{
    
    public class LanguageString
    {
        public List<LanguageStringItem> Items { get; set; } = new List<LanguageStringItem>();
        public string Get(string langCode)
        {
            var item = Items.FirstOrDefault(i => i.Code == langCode);
            if (item == null)
            {
                return Items.FirstOrDefault()?.Value??"";
            }
            return item.Value;
        }
        public static LanguageString CreateLanguageString(Dictionary<string, string> items)
        {
            var result = new LanguageString();
            foreach (var item in items)
            {
                result.Items.Add(new LanguageStringItem()
                {
                    Code = item.Key,
                    Value = item.Value
                });
            }
            return result;
        }
    }
}

