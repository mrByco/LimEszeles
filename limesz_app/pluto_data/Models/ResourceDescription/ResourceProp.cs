using Pluto.Misc;

namespace Pluto.Models.ResourceDescription;

public class ResourceProp
{
    public string PropType { get; set; }
    public string PropName { get; set; }
    public string JSAccessor => PropName.toJSAccessorName();
    // In lists its a ResourceProp or a string representing a primitive type
    // In embedded objects it is a List<ResourceProp> or a string representing its properties. References: The name of the referenced type
    public object? EmbededTypeDefinition { get; set; }
    public ResourcePropOptions PropOptions { get; set; } = new ResourcePropOptions();
}