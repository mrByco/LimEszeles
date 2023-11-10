import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['./field-text.component.scss']
})
export class FieldTextComponent {

  @Input() public HeaderText: string = "";
  @Input() public Placeholder: string = "";
  @Input() public Value: string = "";
  @Output() public ValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() public IsPassword: boolean = false;

  @Input() public Validator?: (value: string) => string[];
  @Output() public Errors: string[] = [];
  @Input() public ShowErrors: boolean = false;
  @Input() public ValidateOnlyAfterFirstBlur: boolean = true;
  @Input() public ValidateWhileType: boolean = false;
  @Input() public ErrorMessagePrefix: string = "";

  public OnTextChange(Event: any) {
    this.ValueChange.emit(this.Value);
    if (this.ValidateWhileType) this.Validate();
  }
  Validate() {
    if (this.Validator) {

      this.Errors = this.ErrorMessagePrefix
        ? this.Validator(this.Value).map(e => `${this.ErrorMessagePrefix}: ${e}`)
        : this.Validator(this.Value);
    }
  }

  public OnBlur() {
    if (this.ValidateOnlyAfterFirstBlur) {
      this.ValidateWhileType = true;
      this.Validate();
    }
  }

}
