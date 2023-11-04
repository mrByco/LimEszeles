import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';

@Component({
  selector: 'app-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent {
  get value(): any {
    return this.resource[this.prop.jsAccessor];
  }

  set value(value: any) {
    this._value = value;
    this.onChanged.emit(value);
  }

  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<any>();

  private _value: any;
}
