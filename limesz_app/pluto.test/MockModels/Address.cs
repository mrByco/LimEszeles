using Pluto.Models;

namespace pluto.test.MockModels;

public class Address: BaseRootModel
{
    public string Country { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string Door { get; set; }
}