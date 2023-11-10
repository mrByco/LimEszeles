import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api-providers/generated-api/models/resource-prop';
import { BaseField } from '../base-field';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends BaseField {


  @Input() set prop(value) {
    this.baseProp = value;
  }
  @Input() set resource(value) {
    this.baseResource = value;
  }
  @Output() get onChanged(){
    return this.baseOnChanged;
  }
}
