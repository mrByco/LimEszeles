/* tslint:disable */
/* eslint-disable */
import { ActivePrompt } from '../models/active-prompt';
import { CustomPromptDefinition } from '../models/custom-prompt-definition';
import { Deck } from '../models/deck';
import { GameSettings } from '../models/game-settings';
import { InGameNotification } from '../models/in-game-notification';
import { Player } from '../models/player';
export interface Game {
  activePrompts?: Array<ActivePrompt> | null;
  customPrompts?: Array<CustomPromptDefinition> | null;
  decks?: Array<Deck> | null;
  inGameNotifications?: Array<InGameNotification> | null;
  interactivePlayers?: Array<Player> | null;
  players?: Array<Player> | null;
  settings?: GameSettings;
}
