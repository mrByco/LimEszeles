import { Component, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';
import { BaseField } from '../../fields/base-field';
import { ResourceDescription } from '../../../../api/models/resource-description';

@Component({
  selector: 'app-list-field',
  templateUrl: './list-field.component.html',
  styleUrls: ['./list-field.component.scss']
})
export class ListFieldComponent extends BaseField {
  public get innerType(): ResourceProp | string{
    return this.baseProp.embededTypeDefinition as ResourceProp | string;
  }

  public get innerTypeName() {

    if(typeof this.innerType === 'string'){

      return this.innerType;
    }
    return this.baseProp.propName;
  }

  getListElementProp(i: number): ResourceProp {
    if(typeof this.innerType === 'string'){
      return {
        propName: `[${i}]`,
        propType: this.innerType,
        jsAccessor: `[${i}]`
      }
    }

    if (!Array.isArray(this.innerType.embededTypeDefinition)){
      return {
        propName: `[${i}]`,
        propType: 'list',
        jsAccessor: `[${i}]`,
        embededTypeDefinition: (this.innerType.embededTypeDefinition as ResourceDescription)
      }
    }

    return {
      propName: `[${i}]`,
      propType: 'object',
      jsAccessor: `[${i}]`,
      embededTypeDefinition: (this.innerType.embededTypeDefinition as ResourceProp[])
    }
  }

  addItem() {
    // Add a new item to the list
    console.log("LIST", this.baseProp, this.baseResource);
    this.value ??= [];
    if (this.baseProp.propType === 'string'){
      this.value.push("");
    }
    if (this.baseProp.propType === 'number'){
      this.value.push(0);
    }
    if (this.baseProp.propType === 'object'){
      this.value.push({});
    }
    if (this.baseProp.propType === 'list'){
      this.value.push([]);
    }
    this.onChanged.emit({path: `[${this.value.length - 1}]`, value: "$INSERT$"});
  }

  removeItem(index: number) {
    // Remove the item at the specified index
    this.value.splice(index, 1);
    this.onChanged.emit({path: `[${index}]`, value: "$REMOVE$"});
  }

  complexChange(path: string, value: any) {
    this.onChanged.emit({path: path, value: value})
  }


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
