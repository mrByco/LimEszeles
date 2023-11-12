using Pluto.Models;

namespace margarita_data.Models;

public class DeletedUser: BaseRootModel
{
    public User User { get; set; }
    public DateTime DeletedAt { get; set; }
}