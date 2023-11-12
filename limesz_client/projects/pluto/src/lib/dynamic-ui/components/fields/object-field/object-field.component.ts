import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceProp } from '../../../../api-providers/generated-api/models/resource-prop';

import { BaseField } from '../base-field';

@Component({
  selector: 'app-object-field',
  templateUrl: './object-field.component.html',
  styleUrls: ['./object-field.component.scss']
})
export class ObjectFieldComponent extends BaseField implements OnInit {
  get listIndex(): number {
    return parseInt(this.baseProp.propName.slice(1, -1));
  }

  public get isListElement(){
    return this.baseProp.propName.startsWith("[") && this.baseProp.propName.endsWith("]");
  }

  public get innerType(){
    return this.baseProp.embededTypeDefinition;
  }

  get innerDefinition(): ResourceProp[] {
    return this.baseProp.embededTypeDefinition;
  }

  ngOnInit(): void {

  }

  @Input() set prop(value) {
    this.baseProp = value;
  }
}
