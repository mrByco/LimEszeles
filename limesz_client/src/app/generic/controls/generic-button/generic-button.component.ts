import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent {
  @Input() Action?: (() => any | void) | (() => Promise<void | void>);
  @Output() OnClick = new EventEmitter<any>();
  @Input() class!: string;
  public isLoading: boolean = false;
  @Input() color: string = "primary"
  @Input() disabled: boolean = false;

  constructor() { }

  CallAction() {
    if (!this.Action) return;

    let result = typeof this.Action === "function" ? this.Action() : this.Action;
    if (typeof result?.then === "function") {
      this.isLoading = true;
      result.then(() => {
        this.isLoading = false;
      });
    }
  }

  async CallClick() {
    await this.CallAction();
    this.OnClick.emit();
  }

}
