namespace Pluto.Misc;

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


    // NAMe => naMe, HELLOWorld => helloWorld, HELLO => hello, GNBeforeTH => gnBeforeTH
    public static string toJSAccessorName(this string input)
    {
        if (string.IsNullOrEmpty(input) || input.Length == 1)
        {
            return input; 
        }
        
        bool foundLower = false;
        char[] chars = input.ToCharArray();
        

        for (int i = 1; i < chars.Length; i++)
        {
            if (char.IsUpper(chars[i - 1]) && char.IsLower(chars[i]))
            {
                break;
            }
            chars[i - 1] = Char.ToLower(chars[i - 1]);
        }
        chars[0] = Char.ToLower(chars[0]);

        return new string(chars);
    }
}