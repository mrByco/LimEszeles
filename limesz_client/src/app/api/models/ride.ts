/* tslint:disable */
/* eslint-disable */
import { Game } from './game';
import { ScoreScreenData } from './score-screen-data';
import { User } from './user';
export interface Ride {
  game?: Game;
  id?: null | string;
  scoreScreenData?: ScoreScreenData;
  state?: null | string;
  users?: null | Array<User>;
}
