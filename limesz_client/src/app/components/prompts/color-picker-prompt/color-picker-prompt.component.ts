import { Component, inject } from '@angular/core';
import { RideService } from '../../../services/ride.service';
import { ActionsApi } from '../../../api/services';
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
