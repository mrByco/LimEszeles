/* tslint:disable */
/* eslint-disable */
import { Game } from '../models/game';
import { GameSettings } from '../models/game-settings';
import { GameStats } from '../models/game-stats';
import { ScoreScreenData } from '../models/score-screen-data';
import { User } from '../models/user';
export interface Ride {
  game?: Game;
  id?: string | null;
  scoreScreenData?: ScoreScreenData;
  settings?: GameSettings;
  state?: string | null;
  stats?: GameStats;
  users?: Array<User> | null;
}
