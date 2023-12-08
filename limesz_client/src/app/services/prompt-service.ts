import { inject, Injectable, Type } from '@angular/core';
import { RideService } from './ride.service';
import { ColorPickerPromptComponent } from '../components/prompts/color-picker-prompt/color-picker-prompt.component';
import { firstValueFrom } from 'rxjs';
import { ActionsApi } from '../api/services';
import { ModalService } from 'projects/pluto/src/public-api';
import {
  ChoosePlayerDeckPromptComponent
} from '../components/prompts/choose-player-deck-prompt/choose-player-deck-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  private modalService: ModalService = inject(ModalService);
  private rideService: RideService = inject(RideService);
  private actionsApi = inject(ActionsApi)

  private shownPromptTokens: string[] = [];


  constructor() {
    this.rideService.ride$.subscribe(ride => {
      let me = this.rideService.meAsPlayer;
      if (ride && me) {
        let promptsToShow = ride.game.activePrompts
          .filter(promptToken => me.userId === promptToken.shownTo)
          .filter(promptToken => !this.shownPromptTokens.includes(promptToken.showToken));
        if (promptsToShow.length > 0) {
          let promptToShow = promptsToShow[0];
          console.log(ride.game.customPrompts, promptToShow)
          let args = ride.game.customPrompts.find(p => p.id == promptToShow.promptDefinitionId)?.configuration;
          if (!args) {
            return;
          }

          let component = this.showPromptById(promptToShow.promptDefinitionId);
          if (!component) {
            console.error("No component found for prompt", promptToShow.promptDefinitionId);
            return;
          }
          component.args = args;

          this.shownPromptTokens.push(promptToShow.showToken);
          component.onResult = (result: any) => {
            if (me) {
              firstValueFrom(this.actionsApi.answerPrompt({userId: me.userId, showToken: promptToShow.showToken, body: result}))
                .then(() => {
                  this.modalService.close();
                });
            }
          }
        }
      }
    });

  }

  private showPromptById(promptToken: string): any {
    switch (promptToken) {
      case 'colorPicker':
        return this.modalService.show<any>(ColorPickerPromptComponent);
      case 'choosePlayerDeck':
        return this.modalService.show<any>(ChoosePlayerDeckPromptComponent);
      default:
        return null;
    }
  }
}
