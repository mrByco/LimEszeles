using margarita_app.Misc;

namespace margarita_data.Models.AutoUI;

public class ResourceProp
{
    public string PropType { get; set; }
    public string PropName { get; set; }
    public string JSAccessor => PropName.ToCamelCase();
}