using margarita_app.Misc;

namespace margarita_data.Models.AutoUI;

public class ResourceProp
{
    public string PropType { get; set; }
    public string PropName { get; set; }
    public string JSAccessor => PropName.toJSAccessorName();
    // In lists its a ResourceProp or a string representing a primitive type
    // In emnbeded objects its a List<ResourceProp> or a string representing its properties 
    public object? EmbededTypeDefinition { get; set; }
    public ResourcePropOptions PropOptions { get; set; } = new ResourcePropOptions();
}