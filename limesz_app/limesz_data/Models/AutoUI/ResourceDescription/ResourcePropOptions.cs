namespace margarita_data.Models.AutoUI;

public class ResourcePropOptions
{
    public bool IsSelfId { get; set; } = false;
    
    // Used when you need to collapse an object
    public string? StringRepresentationFieldName { get; set; }
    // Name of the resource that this prop is a foreign key of
    public string? ForeignKeyOf { get; set; }
    public bool IsReadOnly { get; private set; } = false;
    public void SetReadOnly() => IsReadOnly = true;
}