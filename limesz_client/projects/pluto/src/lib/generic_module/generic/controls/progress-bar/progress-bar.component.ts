import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  get value(): number {
    return this._value;
  }
  @Input()
  set value(value: number) {
    this._value = value;
    setTimeout(() => {
      this.progress = Math.min(value * 100, 100);
    }, 500);
  }

  private _value: number = 30;

  public progress = 0;

}
