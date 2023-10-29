/* tslint:disable */
/* eslint-disable */
import { Deck } from './deck';
import { Player } from './player';
export interface Game {
  decks?: null | Array<Deck>;
  interactivePlayers?: null | Array<Player>;
  players?: null | Array<Player>;
}
