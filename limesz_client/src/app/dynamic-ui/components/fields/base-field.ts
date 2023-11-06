import { EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../api/models/resource-prop';

export abstract class BaseField {
  get value(): any {
    if (this.baseProp.jsAccessor.startsWith('[') && this.baseProp.jsAccessor.endsWith(']')){
      return this._baseResource[parseInt(this.baseProp.jsAccessor.slice(1, -1))];
    }
    return this._baseResource[this.baseProp.jsAccessor];
  }

  set value(value: any) {
    console.log(this._baseResource, this.baseProp.jsAccessor, value)
    this._value = value;
    this.baseOnChanged.emit(value);
  }

  get baseResource(): any {
    return this._baseResource;
  }

  set baseResource(v: any) {
    this._baseResource = v;
    if (this.baseProp.propType === 'object'){
      this._value ??= {};
    }
    if (this.baseProp.propType === 'list'){
      console.log("LIST CORRECTED", this.baseProp, this.baseResource);
      this._value ??= [];
    }
  }
  private _baseResource: any;

  baseProp: ResourceProp;
  baseOnChanged = new EventEmitter<any>();

  private _value: any;

}
