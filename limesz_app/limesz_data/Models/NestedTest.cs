namespace margarita_data.Models;

public class NestedTest: BaseRootModel
{
    public string CarName { get; set; }
    public Engine Engine { get; set; }
    public List<Edition> Editions { get; set; }

    public List<List<string>> ListInList { get; set; }
}

public class Engine
{
    public string EngineName { get; set; }
    public int EnginePower { get; set; }
}

public class Edition
{
    public string EditionName { get; set; }
    public int EditionPower { get; set; }
}