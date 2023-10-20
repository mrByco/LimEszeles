/* tslint:disable */
/* eslint-disable */
import { Player } from './player';
export interface Game {
  id?: null | string;
  players?: null | {
[key: string]: Player;
};
  state?: null | string;
}
