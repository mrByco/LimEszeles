/* tslint:disable */
/* eslint-disable */
import { Card } from './card';
import { DeckConfig } from './deck-config';
export interface Deck {
  cards?: null | Array<Card>;
  deckConfig?: DeckConfig;
  name?: null | string;
}
