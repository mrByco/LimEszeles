import { Color } from '@angular-material-components/color-picker';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  public colorObject: Color = new Color(0, 0, 0, 1);
  @Input() public header: string = 'Color';

  private _value: string = '#000000';
  @Input()
  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
    let rgb = this.hexToRgb(value)!;
    this.colorObject = new Color(rgb.r, rgb.g, rgb.b, 1);
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public setColor() {
    this._value = '#' + this.colorObject.hex;
    this.valueChange.emit(this._value);
  }

  hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }



}
