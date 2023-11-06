import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceProp } from '../../../api/models/resource-prop';
import * as path from 'path';

@Component({
  selector: 'app-dynamic-prop-field',
  templateUrl: './dynamic-prop-field.component.html',
  styleUrls: ['./dynamic-prop-field.component.scss']
})
export class DynamicPropFieldComponent implements OnInit {

  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<{path: string, value: any}>();


  primitiveChange(value){
    this.onChanged.emit({path: this.prop.jsAccessor, value: value})
  }

  complexChange(path: string, value){
    this.onChanged.emit({path: this.prop.jsAccessor + path, value: value})
  }

  ngOnInit(): void {
    //console.log(this.prop, this.resource)
  }



}
