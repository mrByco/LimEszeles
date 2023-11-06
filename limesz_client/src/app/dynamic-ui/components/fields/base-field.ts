import { EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../api/models/resource-prop';
import { ResourceDescription } from '../../../api/models/resource-description';

export abstract class BaseField {

  public get innerType(): ResourceProp[] | ResourceProp | string{
    return this.baseProp.embededTypeDefinition;
  }
  get value(): any {
    if (this.baseProp.jsAccessor.startsWith('[') && this.baseProp.jsAccessor.endsWith(']')){
      return this._baseResource?.[parseInt(this.baseProp.jsAccessor.slice(1, -1))]??undefined;
    }
    return this._baseResource?.[this.baseProp.jsAccessor];
  }

  set value(value: any) {
    if (this._baseResource){
      if (this.baseProp.jsAccessor.startsWith('[') && this.baseProp.jsAccessor.endsWith(']')){
        this._baseResource[parseInt(this.baseProp.jsAccessor.slice(1, -1))]??undefined;
      }
      this._baseResource[this.baseProp.jsAccessor] = value;
    }
    this.baseOnChanged.emit(value);
  }

  get baseResource(): any {
    return this._baseResource;
  }

  set baseResource(v: any) {
    this._baseResource = v;
    if (this.baseProp?.propType === 'object'){
      //this._value ??= {};
    }
    if (this.baseProp?.propType === 'list'){
      this.value ??= [];
    }
  }

  private _baseResource: any;

  baseProp: ResourceProp;
  baseOnChanged = new EventEmitter<{path: string, value: any}>();


}
