/* tslint:disable */
/* eslint-disable */
import { Player } from './player';
export interface Ride {
  id?: null | string;
  players?: null | {
[key: string]: Player;
};
  state?: null | string;
}
