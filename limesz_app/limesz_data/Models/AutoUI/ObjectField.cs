namespace margarita_data.Models.AutoUI;

public class ObjectField
{
    public string Name { get; set; }
    // Types string, multiline, int, float, bool, enum, object, list, dictionary
    public string Type { get; set; }
    
    // Can be used in the case of a object, list, dictionary
    public string? NestedType { get; set; }
    
    
}