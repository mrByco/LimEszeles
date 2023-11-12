import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api-providers/generated-api/models/resource-prop';

@Component({
  selector: 'app-bool-field',
  templateUrl: './bool-field.component.html',
  styleUrls: ['./bool-field.component.scss']
})
export class BoolFieldComponent {
  get value(): boolean {
    return this.data[this.prop.jsAccessor]
  }

  set value(value: boolean) {
    this._value = value;
    this.data[this.prop.jsAccessor] = value;
    this.onChanged.emit(value)
  }

  @Input() prop: ResourceProp;
  @Input() data: any;
  @Output() onChanged = new EventEmitter<boolean>();

  private _value: boolean;
}
