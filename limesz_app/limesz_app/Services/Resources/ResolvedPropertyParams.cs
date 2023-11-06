using System.Reflection;

namespace margarita_app.Services;

public class ResolvedPropertyParams
{
    public object currentObject { get; set; }
    public PropertyInfo ContainerPropertyInfo { get; set; }
    public object ContainerObject { get; set; }
}