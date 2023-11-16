import { EventEmitter, inject, Input, Optional, Output } from '@angular/core';
import { PlResource } from '../../directives/pl-resource.directive';
import { ResourceProp } from '../../../api-providers/generated-api/models/resource-prop';
import { getPropertyByJsPath, setPropertyByJsPath } from '../../../helpers/apollo-resource-utils';
import { PlForState } from '../../directives/pluto-for-of.directive';

export abstract class BaseField {

  get getHeader(): string {
    return this.baseProp.propName + " " + (this.baseProp.propOptions?.isReadOnly ? "(readonly)" : "");
  }

  get baseProp(): ResourceProp {
    return this._baseProp;
  }

  set baseProp(value: ResourceProp) {
    this._baseProp = value;
    this.updateComputedPathAndSyncIfCan();
  }
  private _baseProp: ResourceProp;

  private get canSyncToResource(): boolean {
    return this._baseProp?.fullJsAccessor !== undefined && this.plResource?.data !== undefined && this.realizedJsPath !== undefined;
  }

  plResource: PlResource;
  private plForState: PlForState | undefined;
  public realizedJsPath: string | undefined;

  constructor() {
    this.plResource = inject(PlResource);
    this.plForState = inject(PlForState, { optional: true });
  }

  get value(): any {
    if (!this.canSyncToResource) {
      return this._valueBuffer;
    }
    let ret= getPropertyByJsPath(this.plResource.data, this.realizedJsPath);
    //console.log(this.realizedJsPath, ret);
    return ret;
  }

  set value(value: any) {
    if (!this.canSyncToResource) {
      this._valueBufferDirty = true;
      this._valueBuffer;
      return;
    }
    setPropertyByJsPath(this.plResource.data, this.realizedJsPath, value);
    this.plResource.registerChange(this.realizedJsPath, value);
  }

  private _valueBufferDirty: boolean = false;
  _valueBuffer: any;

  private updateComputedPathAndSyncIfCan() {
    if ( this._baseProp?.fullJsAccessor) {
      this.realizedJsPath = this._baseProp.fullJsAccessor;
      for (let key of Object.keys(this.plForState?.mergedState??{})) {
        this.realizedJsPath = `${this.realizedJsPath.replace(key, this.plForState.mergedState[key].toString())}`;
      }
    }
    if (this.canSyncToResource && this._valueBufferDirty) {
      this.value = this._valueBuffer;
      this._valueBufferDirty = false;
    }
  }

}
