/* tslint:disable */
/* eslint-disable */
import { ActivePrompt } from './active-prompt';
import { CustomPromptDefinition } from './custom-prompt-definition';
import { Deck } from './deck';
import { InGameNotification } from './in-game-notification';
import { Player } from './player';
export interface Game {
  activePrompts?: null | Array<ActivePrompt>;
  customPrompts?: null | Array<CustomPromptDefinition>;
  decks?: null | Array<Deck>;
  inGameNotifications?: null | Array<InGameNotification>;
  interactivePlayers?: null | Array<Player>;
  players?: null | Array<Player>;
}
