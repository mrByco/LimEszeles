import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseField } from '../fields/base-field';

@Component({
  selector: 'app-dynamic-prop-field',
  templateUrl: './dynamic-prop-field.component.html',
  styleUrls: ['./dynamic-prop-field.component.scss']
})
export class DynamicPropFieldComponent extends BaseField {



  @Input() set prop(value) {
    this.baseProp = value;
  }
  get prop(){
    return this.baseProp;
  }

  @Input()
  fullJsAccessor: string = "UNSET"
}
