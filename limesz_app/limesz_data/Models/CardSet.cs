using limesz_app.Misc.GameLogic.Abstraction;
using Pluto.Models;
using Pluto.Models.ResourceAnnotation;

namespace margarita_data.Models;

public class CardSet: BaseRootModel
{
    public string Name { get; set; }
    [CanSetNull] public string Description { get; set; }
    public List<Card> Cards { get; set; }
}