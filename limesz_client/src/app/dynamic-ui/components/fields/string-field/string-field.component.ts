import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';
import { BaseField } from '../base-field';

@Component({
  selector: 'app-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent extends BaseField {

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
