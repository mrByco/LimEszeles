using limesz_app.Misc.GameLogic.Abstraction;
using limesz_app.Services;
using margarita_data.Models;

namespace limesz_app.Misc.GameLogic.CardGame
{
    public class LimeszUno : IGameBehaviour
    {
        private List<string> playersWithUno = new List<string>();
        private CardGame Game { get; set; }
        private GameSettings GameSettings { get; set; }
        
        public LimeszUno(GameSettings settings)
        {
            GameSettings = settings;
        }

        public void Init(CardGame game)
        {
            Game = game;
            Game.CreateDeck("Source", CardSetService.GetCardSets().Find(c => c.Id == this.GameSettings.CardSetId)!.Cards);
            Game.CreateDeck("Discard", new List<Card>());
            Game.GetDeck("Discard").DeckConfig.UpsideDown = false;
            Game.GetDeck("Discard").DeckConfig.CanPull = false;
            Game.DefinePrompt("colorPicker", "color-picker", new List<string>{ "red", "green", "blue", "yellow"});
            Game.DefineButton("uno", "someTexture", (string callerId) =>
            {
                var player = Game.CurrentPlayer;
                if (player.Id != callerId)
                {
                    return;
                }

                if (player.Cards.Count > 1)
                {
                    Game.GiveCards(player.Id, 1, "Source");
                }
                else if (!playersWithUno.Contains(callerId))
                {
                    playersWithUno.Add(callerId);
                }
                Game.NotifyClients();
            });
        }

        public void Start()
        {
            Game.ShuffleDeck("Source");
            Game.DealCards("Source", 5);
            Game.MoveCard("Source", "Discard", Game.GetLastCardFromDeck("Source").Id);
            Game.SetCurrentPlayer(Game.RandomPlayer.Id);
        }

        public async void PlayCard(Card card, Player player)
        {
            if (!player.Cards.Contains(card))
            {
                throw new Exception("Player doesn't have this card");
            }

            var lastCard = Game.GetLastCardFromDeck("Discard");
            if (IsCardPlayable(card, lastCard))
            {
                Game.MoveCard(Game.CurrentPlayer.Id, "Discard", card.Id);

                if (player.Cards.Count == 1)
                {
                }

                if (player.Cards.Count == 0)
                {
                    // Send notificattion so player x won, and remove from players
                    
                    Game.SendNotification($"{player.Name} won!");
                    Game.RemovePlayer(player.Id);
                }

                var cardValue = card.Params["Value"] as string;
                if (cardValue == "Reverse")
                {
                    Game.ReverseOrder();
                }
                else if (cardValue == "Skip")
                {
                    Game.SetCurrentPlayer(Game.DefaultNextPlayer);
                }
                else if (cardValue == "Draw 2")
                {
                    Game.GiveCards(Game.DefaultNextPlayer, 2, "Source");
                    SendPenaltyNotification(Game.CurrentPlayer.Name, 2);
                    //Skip next player
                    Game.SetCurrentPlayer(Game.DefaultNextPlayer);
                }
                else if (cardValue == "Wild Draw 4")
                {
                    var pickedColor = await Game.WaitForPrompt(player.Id, "colorPicker");
                    Game.GiveCards(Game.DefaultNextPlayer, 4, "Source");
                    SendPenaltyNotification(Game.CurrentPlayer.Name, 4);
                    card.Params["Color"] = pickedColor["color"].ToString();
                    //Skip next player
                    Game.SetCurrentPlayer(Game.DefaultNextPlayer);
                }
                else if (cardValue == "Wild")
                {
                    var pickedColor = await Game.WaitForPrompt(player.Id, "colorPicker");
                    Game.SendNotification($"{player.Name} picked {pickedColor["color"]}");
                    card.Params["Color"] = pickedColor["color"].ToString();
                }
            }
            else
            {
                Game.GiveCards(Game.CurrentPlayer.Id, 2, "Source");
            }
            NextPlayer();
        }

        public void PullFromDeck(Player getPlayer, Deck getDeck, int count)
        {
            Game.GiveCards(getPlayer.Id, count, getDeck.Name);
            NextPlayer();
        }

        private void NextPlayer()
        {
            Game.SetCurrentPlayer(Game.DefaultNextPlayer);
            var newCurrentPlayer = Game.CurrentPlayer;
            
            if (newCurrentPlayer.Cards.Count == 1 && !playersWithUno.Contains(newCurrentPlayer.Id) && false)
                Game.GiveCards(newCurrentPlayer.Id, 1, "Source");
            
            if (playersWithUno.Contains(newCurrentPlayer.Id)) 
                playersWithUno.Remove(newCurrentPlayer.Id);
            
            // Reshuffle the deck if there is more than 10 cards
            if (Game.GetDeck("Source").Cards.Count < 10)
            {
                var deck = Game.GetDeck("Discard");
                for (int i = 0; i < deck.Cards.Count - 2; i++)
                {
                    var lastCard = deck.Cards[0];
                    Game.MoveCard("Discard", "Source", lastCard.Id);
                }
                
                Game.ShuffleDeck("Source");
                Game.SendNotification("Source is reshuffled, with drop cards.");
            }

            Game.NotifyClients();
        }

        private bool IsCardPlayable(Card card, Card lastCard)
        {
            if (card.Params["Color"].Equals(lastCard.Params["Color"]) || card.Params["Value"].Equals(lastCard.Params["Value"]))
            {
                return true;
            }

            if (card.Params["Value"] == "Wild" || card.Params["Value"] == "Wild Draw 4")
            {
                return true;
            }

            return false;
        }
        
        /*private List<string> penaltyMessages = new List<string>
        {
            "Bad luck, {PlayerName}! You've just earned yourself {CardCount} more cards. Ouch!",
            "You must be a magnet, {PlayerName}, because you just attracted {CardCount} more cards. Sorry!",
            "Guess what, {PlayerName}? You get the pleasure of drawing {CardCount} extra cards. Fun, right?",
            "It's raining cards for you, {PlayerName}. {CardCount} to be exact. Enjoy!",
            "{PlayerName}, it's time to pay the piper. Here are {CardCount} more cards for you.",
            "Penalty alert for {PlayerName}! You've been handed {CardCount} more cards. Tough break!",
            "{PlayerName}, you've got {CardCount} more cards to juggle. Good luck!",
            "Whoops, {PlayerName}! You just won the 'Draw {CardCount} More Cards' lottery!",
            "{PlayerName}, consider this your lucky day. You get to draw {CardCount} more cards!",
            "What's better than cards? More cards! {PlayerName}, you're up for {CardCount} extras.",
            "Surprise, {PlayerName}! Life's just dealt you {CardCount} extra cards. Deal with it!",
            "Looks like {PlayerName} is in a card-drawing mood. {CardCount} more coming right up!",
            "{PlayerName}, your new nickname is 'Card Collector' because you've got {CardCount} extra.",
            "Feeling lucky, {PlayerName}? Well, you've just won {CardCount} more cards!",
            "Who needs more cards? {PlayerName} does! Here's your {CardCount} surprise.",
            "{PlayerName}, remember that wish you made? Well, you've got {CardCount} cards instead!",
            "Keep calm and draw on, {PlayerName}. It's just {CardCount} more cards!",
            "No need to thank us, {PlayerName}, but you've got {CardCount} more cards!",
            "Hold onto your hats, {PlayerName}! {CardCount} more cards are headed your way.",
            "Ready for a challenge, {PlayerName}? You're the proud owner of {CardCount} more cards!"
        };*/

        private List<string> penaltyMessages = new List<string>()
        {
            "Nézzünk a jövőbe, {PlayerName}! Most {CardCount} kártyát látsz!",
            "Új szintre léptél, {PlayerName}! Most {CardCount} további kártyát kap.",
            "Kártyák, kártyák, kártyák! {PlayerName}, most {CardCount} további kártya a tiéd!",
            "Van egy ajándékod, {PlayerName}! Kitalálod mi? {CardCount} kártya!",
            "Nyisd ki a kaput, {PlayerName}! Most {CardCount} további kártya érkezik.",
            "Van egy ajándékod, {PlayerName}! Kitalálod mi? {CardCount} kártya!",
            "Az élet nem mindig a pakli szerint játszik, de {PlayerName} most {CardCount} új lapot kap.",
            "Ez a kártyahúzás egyfajta művészet, {PlayerName}. Most {CardCount} kártya az alkotásod.",
            "Valószínűleg gondoltad már, hogy több kártyára van szükséged, {PlayerName}. Nos, itt vannak: {CardCount} kártya!",
            "Ne unatkozz, {PlayerName}, {CardCount} új lap.",
            "A kártyák sosem hazudnak, {PlayerName}. Most {CardCount} újabb igazság érkezik.",
            "A nap kérdése: Hány kártya? A válasz: {CardCount}, {PlayerName}!",
            "Kártyahúzás, mint egy profi. {PlayerName} {CardCount} újabb lappal gyakorolt.",
            "Valószínűleg azt kérdezted, mikor jössz rá, mi az élet értelme, {PlayerName}. Nos, most tudod: {CardCount} új kártya.",
            "A kártyák tükrözik a lelked, {PlayerName}, lelke {CardCount} ponttal gazdagodott.",
            "Nem a mennyiség, hanem a minőség számít, {PlayerName}, de most {CardCount} további kártyád van.",
            "Valószínűleg érzed már a lapok hívását, {PlayerName}. Most {CardCount} további lap a tiéd."
        };
        
        public void SendPenaltyNotification(string playerName, int cardCount)
        {
            // Choose a random message from the list
            Random random = new Random();
            int randomIndex = random.Next(penaltyMessages.Count);
            string randomPenaltyMessage = penaltyMessages[randomIndex];

            // Template the message with the player's name and card count
            string templatedMessage = randomPenaltyMessage
                .Replace("{PlayerName}", playerName)
                .Replace("{CardCount}", cardCount.ToString());

            // Send the templated message
            Game.SendNotification(templatedMessage);
        }

    }
}
