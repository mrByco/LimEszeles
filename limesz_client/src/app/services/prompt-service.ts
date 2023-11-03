import { inject, Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { RideService } from './ride.service';
import { ColorPickerPromptComponent } from '../components/prompts/color-picker-prompt/color-picker-prompt.component';
import { ActionsService as ActionsApi } from '../api/services/actions.service';
import { firstValueFrom } from 'rxjs';

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
          console.log(args);
          let component = this.modalService.show<any>(ColorPickerPromptComponent);
          component.args = args;
          this.shownPromptTokens.push(promptToShow.showToken);
          component.onResult = (result: any) => {
            if (me) {
              firstValueFrom(this.actionsApi.answerPrompt({userId: me.userId, showToken: promptToShow.showToken, body: {color: result}}))
                .then(() => {
                  this.modalService.close();
                });
            }
          }
        }
      }
    });
  }
}
