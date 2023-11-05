import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';

@Component({
  selector: 'app-bool-field',
  templateUrl: './bool-field.component.html',
  styleUrls: ['./bool-field.component.scss']
})
export class BoolFieldComponent {
  get value(): boolean {
    console.log(this.resource[this.prop.jsAccessor], this.prop.jsAccessor, this.resource);
    return this.resource[this.prop.jsAccessor]
  }

  set value(value: boolean) {
    this._value = value;
    this.resource[this.prop.jsAccessor] = value;
    this.onChanged.emit(value)
  }
  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<boolean>();

  private _value: boolean;
}
