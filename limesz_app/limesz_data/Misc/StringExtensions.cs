namespace margarita_app.Misc;

public static class StringExtensions
{
    public static string ToCamelCase(this string str)
    {
        if (string.IsNullOrEmpty(str))
            return str;
        if (str.Length == 1)
            return str.ToLower();
        return char.ToLowerInvariant(str[0]) + str.Substring(1);
    }
}