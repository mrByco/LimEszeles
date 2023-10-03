import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-touch-button',
  templateUrl: './touch-button.component.html',
  styleUrls: ['./touch-button.component.scss']
})
export class TouchButtonComponent {
  @Input()
  public disabled: boolean = false;

  @Output()
  public Click: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    if (this.disabled) return;
    this.Click.emit();
  }
}
