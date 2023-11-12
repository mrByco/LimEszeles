using System.Reflection;

namespace pluto.Services.Resources;

public class ResolvedPropertyParams
{
    public object currentObject { get; set; }
    public PropertyInfo ContainerPropertyInfo { get; set; }
    public object ContainerObject { get; set; }
}