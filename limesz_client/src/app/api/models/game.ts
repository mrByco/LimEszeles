/* tslint:disable */
/* eslint-disable */
import { Card } from './card';
import { Player } from './player';
export interface Game {
  deck?: null | Array<Card>;
  id?: null | string;
  players?: null | {
[key: string]: Player;
};
  state?: null | string;
}
