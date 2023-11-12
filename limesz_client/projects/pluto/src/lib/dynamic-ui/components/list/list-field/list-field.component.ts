import { Component, inject, Input, Output, TrackByFunction } from '@angular/core';
import { ResourceProp } from '../../../../api-providers/generated-api/models/resource-prop';
import { getPropertyByJsPath, setPropertyByJsPath } from '../../../../helpers/apollo-resource-utils';
import { PlResource } from '../../../directives/pl-resource.directive';
import { BaseField } from '../../fields/base-field';
import { PlForState } from '../../../directives/pluto-for-of.directive';

@Component({
  selector: 'app-list-field',
  templateUrl: './list-field.component.html',
  styleUrls: ['./list-field.component.scss']
})
export class ListFieldComponent {
  get prop(): ResourceProp {
    return this._prop;
  }
  @Input()
  set prop(value: ResourceProp) {
    this._prop = value;
    this.updateComputedPathAndSyncIfCan();
  }
  private _prop: ResourceProp;

  plResource: PlResource;
  private get canSyncToResource(): boolean {
    return this.prop?.fullJsAccessor !== undefined && this.plResource?.data !== undefined && this.realizedJsPath !== undefined;
  }

  private plForState: PlForState;
  private realizedJsPath: string | undefined;

  constructor() {
    this.plForState = inject(PlForState, { optional: true });
    this.plResource = inject(PlResource);
    this.plForState ??= new PlForState();
    this.plForState.mergedState ??= {};
  }

  public get innerTypeName() {
    if(typeof this.innerType === 'string'){
      return this.innerType;
    }

    return (this.innerType as ResourceProp).propType;
  }

  getPathToElement(i: number) {
    return `${this.realizedJsPath}[${i}]`;
  }

  // Gets the type for the element by its index
  track: TrackByFunction<any> = (i, item) => {
    return i;
  }

  getListElementProp(i: number): ResourceProp {
    if(typeof this.innerType === 'string'){
      return {
        propName: `[${i}]`,
        propType: this.innerType,
        jsAccessor: `[${i}]`,
        fullJsAccessor: this.getPathToElement(i)
      }
    }

    let innerObjectType = this.innerType

    return this.innerType as ResourceProp;
  }

  public setFullJsPathInEmbeddedTypeDefinition(i: number, definition: ResourceProp) {
    if (!definition || typeof definition === 'string') {
      return;
    }
    definition.fullJsAccessor = definition.fullJsAccessor?.replace(this._prop.id, i.toString());
    if (Array.isArray(definition)) {
      for (let prop of definition) {
        this.setFullJsPathInEmbeddedTypeDefinition(i, prop as ResourceProp);
      }
    }
    else {
      definition.fullJsAccessor = definition.fullJsAccessor.replace(this._prop.id, i.toString());
      this.setFullJsPathInEmbeddedTypeDefinition(i, definition.embededTypeDefinition);
    }
    return JSON.parse(JSON.stringify(definition));
  }

  addItem() {
    // Add a new item to the list
    this.value ??= [];
    if (this._prop.propType === 'string'){
      this.value.push("");
    }
    if (this._prop.propType === 'number'){
      this.value.push(0);
    }
    if (this._prop.propType === 'object'){
      this.value.push(null);
    }
    if (this._prop.propType === 'list'){
      this.value.push([]);
    }
    this.plResource.registerChange(this.getPathToElement(this.value.length - 1), "$INSERT$");
    console.log(this.plResource.data);
  }

  removeItem(index: number) {
    // Remove the item at the specified index
    this.value.splice(index, 1);
    this.plResource.registerChange( this.getPathToElement(index), "$REMOVE$");
  }

  public get innerType(): ResourceProp {

    if(typeof this._prop.embededTypeDefinition === 'string'){
      return {
        propName: `Value`,
        propType: this._prop.embededTypeDefinition,
        jsAccessor: `[${this._prop.id}]`,
        fullJsAccessor: this._prop.fullJsAccessor
      }
    }
    return this._prop.embededTypeDefinition;
  }

  get value(): any {
    if (!this.canSyncToResource) {
      return this._valueBuffer;
    }
    return getPropertyByJsPath(this.plResource.data, this.realizedJsPath);
  }

  set value(value: any) {
    if (!this.canSyncToResource) {
      this._valueBufferDirty = true;
      this._valueBuffer = value;
      return;
    }
    setPropertyByJsPath(this.plResource.data, this.realizedJsPath, value);
  }

  private _valueBufferDirty: boolean = false;
  private _valueBuffer = [];

  private updateComputedPathAndSyncIfCan() {
    if (this.plForState?.mergedState && this._prop?.fullJsAccessor) {
      this.realizedJsPath = this.prop.fullJsAccessor;
      this.realizedJsPath = `${this.realizedJsPath.replace(`[${this.prop.id}]`, '')}`;
      for (let key of Object.keys(this.plForState.mergedState)) {
        if (key != this.prop.id) {
          this.realizedJsPath = `${this.realizedJsPath.replace(key, this.plForState.mergedState[key].toString())}`;
        }
      }
    }
    if (this.canSyncToResource && this._valueBufferDirty) {
      this.value = this._valueBuffer;
      this._valueBufferDirty = false;
    }
  }

}
