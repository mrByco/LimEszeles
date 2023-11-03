using System.Runtime.Serialization;

namespace margarita_app.Models
{
    [KnownType(typeof(MetricsResultDTO))]
    public class MetricsResultDTO
    {
        public string ResultType { get; set; }
        public List<object> Data { get; set; }
    }
}
