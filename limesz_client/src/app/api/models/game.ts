/* tslint:disable */
/* eslint-disable */
import { Deck } from './deck';
import { Player } from './player';
export interface Game {
  decks?: null | Array<Deck>;
  players?: null | Array<Player>;
}
