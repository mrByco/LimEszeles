/* tslint:disable */
/* eslint-disable */
import { Game } from '../models/game';
import { ScoreScreenData } from '../models/score-screen-data';
import { User } from '../models/user';
export interface Ride {
  game?: Game;
  id?: string | null;
  scoreScreenData?: ScoreScreenData;
  state?: string | null;
  users?: Array<User> | null;
}
