/* tslint:disable */
/* eslint-disable */
import { Card } from '../models/card';
import { DeckConfig } from '../models/deck-config';
export interface Deck {
  cards?: Array<Card> | null;
  deckConfig?: DeckConfig;
  name?: string | null;
}
