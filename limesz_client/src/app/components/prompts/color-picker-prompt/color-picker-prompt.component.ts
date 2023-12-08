import { Component, inject } from '@angular/core';
import { IPromptDisplay } from '../prompt-display';

@Component({
  selector: 'app-color-picker-prompt',
  templateUrl: './color-picker-prompt.component.html',
  styleUrls: ['./color-picker-prompt.component.scss']
})
export class ColorPickerPromptComponent implements IPromptDisplay {

  args: string[];
  public onResult: (result: any) => void = () => { };
  public setArgs: (args: string[]) => void = (args) => {
    this.args = args;
  };


  pickColor(color: string) {
    console.log(color);
    this.onResult({color: color})
  }

}
