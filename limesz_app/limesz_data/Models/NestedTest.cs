namespace margarita_data.Models;

public class NestedTest: BaseRootModel
{
    public string CarName { get; set; }
    public Engine Engine { get; set; } = new Engine();
    public List<Edition> Editions { get; set; } = new List<Edition>();

    public List<List<string>> ListInList { get; set; } = new List<List<string>>();
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