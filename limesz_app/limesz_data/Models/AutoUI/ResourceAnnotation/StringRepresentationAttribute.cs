namespace margarita_data.Models.AutoUI.ResourceAnnotation;

[System.AttributeUsage(System.AttributeTargets.Class)]
public class StringRepresentationAttribute : System.Attribute
{
    string Name;
    
    public StringRepresentationAttribute(string name)
    {
        Name = name;
    }
}