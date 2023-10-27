/* tslint:disable */
/* eslint-disable */
import { Card } from './card';
import { Player } from './player';
export interface Game {
  cardsByPlayerId?: null | {
[key: string]: Array<Card>;
};
  deck?: null | Array<Card>;
  id?: null | string;
  players?: null | {
[key: string]: Player;
};
  state?: null | string;
}
