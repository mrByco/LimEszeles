using cardsplusplus.Abstraction;
using margarita_app.Models;

namespace margarita_app.Services.CardGame;

public interface IGameBehaviour
{
    void Init(Misc.GameLogic.CardGame.CardGame game);
    void Start();

    void PlayCard(Card card, Player player);
    void PullFromDeck(Player getPlayer, Deck getDeck, int count);
}