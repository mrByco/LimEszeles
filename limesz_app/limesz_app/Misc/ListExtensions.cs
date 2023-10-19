namespace margarita_app.Misc;

public static class ListExtensions
{
    public static void Replace<T>(this List<T> list, T oldItem, T newItem)
    {
        var index = list.IndexOf(oldItem);
        if (index != -1)
        {
            list[index] = newItem;
        }
    }
}