using Pluto.Models;
using Pluto.Models.ResourceAnnotation;

namespace pluto.test.MockModels;


public class Restaurant: BaseRootModel
{
    public string Name { get; set; }
    public Address Address { get; set; }
    [ForeignKey(typeof(RestaurantFranchise))]
    public string Franchise { get; set; }
}