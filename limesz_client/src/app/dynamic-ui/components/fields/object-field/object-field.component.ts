import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';
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

  change(event: { path: string; value: any }) {
    this.onChanged.emit({
      path: "." + event.path,
      value: event.value
    });
    console.log("OBJ", this.resource)
  }

  ngOnInit(): void {
    console.log(this.prop, this.resource)
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
