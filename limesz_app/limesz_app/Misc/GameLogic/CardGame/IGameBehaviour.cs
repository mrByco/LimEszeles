using limesz_app.Misc.GameLogic.Abstraction;

namespace limesz_app.Misc.GameLogic.CardGame;

public interface IGameBehaviour
{
    void Init(Misc.GameLogic.CardGame.CardGame game);
    void Start();

    void PlayCard(Card card, Player player);
    void PullFromDeck(Player getPlayer, Deck getDeck, int count);
}