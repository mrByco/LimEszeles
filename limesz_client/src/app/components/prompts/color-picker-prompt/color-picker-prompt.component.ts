import { Component, inject } from '@angular/core';
import { ActionsService as ActionsApi } from '../../../api/services/actions.service';
import { RideService } from '../../../services/ride.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-color-picker-prompt',
  templateUrl: './color-picker-prompt.component.html',
  styleUrls: ['./color-picker-prompt.component.scss']
})
export class ColorPickerPromptComponent {

  args: string[];
  public onResult: (result: any) => void = () => { };

  private rideService = inject(RideService);
  private actionsApi = inject(ActionsApi);



  pickColor(color: string) {
    console.log(color);
    this.onResult(color)
  }

}
