import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';
import { Resource } from '@angular/compiler-cli/src/ngtsc/metadata';
import { ResourceDescription } from '../../../../api/models/resource-description';
import _default from 'chart.js/dist/core/core.interaction';
import index = _default.modes.index;
import * as path from 'path';

@Component({
  selector: 'app-list-field',
  templateUrl: './list-field.component.html',
  styleUrls: ['./list-field.component.scss']
})
export class ListFieldComponent {
  get resource(): any {
    return this._resource;
  }
  @Input()
  set resource(value: any) {
    // TODO handle nullable types
    this._resource = value;
    this._resource[this.prop.jsAccessor] ??= [];
  }

  @Input() prop: ResourceProp;
  private _resource: any;
  @Output() onChanged = new EventEmitter<{path: string, value: any}>();
  protected isPrimitiveType(): boolean {
    return typeof this.innerType === 'string';
  };


  get getObjectResourceProp(): ResourceProp {
    return {
      propName: this.prop.propName,
      propType: 'object',
      jsAccessor: this.prop.jsAccessor,
      embededTypeDefinition: this.prop.embededTypeDefinition
    }
  };

  public get innerType(): ResourceProp[] | string{
    return this.prop.embededTypeDefinition as ResourceProp[]  | string;
  }


  public get innerTypeName() {

    if(typeof this.innerType === 'string'){

      return this.innerType;
    }
    return this.prop.propName;
  }

  getListElementProp(i: number): ResourceProp {
    if(typeof this.innerType === 'string'){
      return {
        propName: `[${i}]`,
        propType: this.innerType,
        jsAccessor: `[${i}]`
      }
    }
    return {
      propName: `[${i}]`,
      propType: 'object',
      jsAccessor: `[${i}]`,
      embededTypeDefinition: this.innerType
    }
  }


  addItem() {
    // Add a new item to the list
    this._resource[this.prop.jsAccessor].push('New Item');
    this.onChanged.emit({path: `[${this.resource[this.prop.jsAccessor].length - 1}]`, value: "$INSERT$"});
  }

  removeItem(index: number) {
    // Remove the item at the specified index
    this._resource[this.prop.jsAccessor].splice(index, 1);
    this.onChanged.emit({path: `[${index}]`, value: "$REMOVE$"});
  }

  complexChange(path: string, value: any) {
    this.onChanged.emit({path: path, value: value})
  }

  objectChanged() {

  }
}
