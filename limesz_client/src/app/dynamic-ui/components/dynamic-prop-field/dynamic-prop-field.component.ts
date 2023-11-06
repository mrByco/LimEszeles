import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceProp } from '../../../api/models/resource-prop';
import * as path from 'path';
import { BaseField } from '../fields/base-field';

@Component({
  selector: 'app-dynamic-prop-field',
  templateUrl: './dynamic-prop-field.component.html',
  styleUrls: ['./dynamic-prop-field.component.scss']
})
export class DynamicPropFieldComponent extends BaseField implements OnInit {

  primitiveChange(value){
    this.onChanged.emit({path: this.prop.propName, value: value})
  }

  complexChange(path: string, value){
    this.onChanged.emit({path: this.prop.propName + path, value: value})
  }

  ngOnInit(): void {
    //console.log(this.prop, this.resource)
  }

  @Input() set prop(value) {
    this.baseProp = value;
  }
  get prop(){
    return this.baseProp;
  }
  @Input() set resource(value) {
    this.baseResource = value;
  }
  get resource(){
    return this.baseResource;
  }
  @Output() get onChanged(){
    return this.baseOnChanged;
  }
}
