using cardsplusplus.Abstraction;
using margarita_app.Models;
using margarita_app.Services;
using margarita_app.Services.CardGame;
using System;
using System.Collections.Generic;

namespace margarita_app.Misc.GameLogic.CardGame
{
    public class LimeszUno : IGameBehaviour
    {
        private List<string> playersWithUno = new List<string>();
        private CardGame Game { get; set; }

        public void Init(CardGame game)
        {
            Game = game;
            Game.CreateDeck("Source", CardSetService.GetUnoCardSet());
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
                    //Skip next player
                    Game.SetCurrentPlayer(Game.DefaultNextPlayer);
                }
                else if (cardValue == "Wild Draw 4")
                {
                    var pickedColor = await Game.WaitForPrompt(player.Id, "colorPicker");
                    Game.GiveCards(Game.DefaultNextPlayer, 4, "Source");
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
    }
}
