using Pluto.Models;

namespace pluto.test.MockModels;

public class RestaurantFranchise: BaseRootModel
{
    public string Name { get; set; }
    public Address Address { get; set; }
}