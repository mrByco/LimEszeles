using System.Reflection;

namespace margarita_app.Misc
{
    using System.Net.Http.Json;
    using System.Text.Json.Serialization;
    using Newtonsoft.Json;


    public class LogLevelConfig
    {
        [JsonProperty("Default")]
        public string? Default { get; set; }

        [JsonProperty("Microsoft")]
        public string? Microsoft { get; set; }

        [JsonProperty("Microsoft.Hosting.Lifetime")]
        public string? MicrosoftHosting { get; set; }
    }


    public class JwtConfig
    {
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public string? Key { get; set; }
    }

    public class PlutoConfig
    {
        [JsonProperty("Logging")]
        public LogLevelConfig? Logging { get; set; }

        [JsonProperty("AllowedHosts")]
        public string? AllowedHosts { get; set; }

        [JsonProperty("Jwt")]
        public JwtConfig? Jwt { get; set; }

        [JsonProperty("SendGridAPIkey")]
        public string? SendGridAPIkey { get; set; }

        [JsonProperty("HostNameForEmails")]
        public string? HostNameForEmails { get; set; }

        [JsonProperty("MongoConnectionString")]
        public string? MongoConnectionString { get; set; }

        [JsonProperty("GOOGLE_APPLICATION_JSON")]
        public string GOOGLE_APPLICATION_JSON { get; set; }

        [JsonProperty("GOOGLE_GEOCODING")]
        public string GOOGLE_GEOCODING { get; set; }

        [JsonProperty("OPEN_AI_KEY")]
        public string OPEN_AI_KEY { get; set; }



        [Newtonsoft.Json.JsonIgnore]
        public static PlutoConfig Instance { get; set; }
        
        [Newtonsoft.Json.JsonIgnore]
        public static Assembly BindingAssembly { get; set; }
    }
}

