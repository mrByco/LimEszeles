namespace margarita_data.Models.AutoUI;

public class ResourceDescription
{
    public string Name { get; set; }
    public string Type { get; set; }
    public List<ResourceProp> Props { get; set; }
    public ResourceDescriptionOptions DescriptionOptions { get; set; } = new ResourceDescriptionOptions();
}