using System.Reflection;

namespace pluto.Misc;

public static class TypeExtensions
{
    public static PropertyInfo GetPropertyIgnoreCase(this Type type, string propertyName)
    {
        var finalPropertyInfo = type.GetProperty(propertyName);
        if (finalPropertyInfo == null)
        {
            var sameNameProperties = type
                .GetProperties()
                .Where(p => p.Name.ToLower() == propertyName.ToLower())
                .ToArray();
            if (sameNameProperties.Count() > 1)
            {
                throw new Exception($"Multiple properties with name {propertyName} found on type {type.Name}");
            }

            finalPropertyInfo = sameNameProperties.FirstOrDefault();
        }

        return finalPropertyInfo;
    }
}