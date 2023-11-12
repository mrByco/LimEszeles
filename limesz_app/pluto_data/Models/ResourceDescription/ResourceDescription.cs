namespace Pluto.Models.ResourceDescription;

public class ResourceDescription
{
    public string Name { get; set; }
    public string Type { get; set; }
    public List<ResourceProp> Props { get; set; }
    public ResourceDescriptionOptions DescriptionOptions { get; set; } = new ResourceDescriptionOptions();
}