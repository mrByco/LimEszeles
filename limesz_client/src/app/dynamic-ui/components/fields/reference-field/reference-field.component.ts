import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { BaseField } from '../base-field';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ResourceService } from 'src/app/dynamic-ui/services/resource-service';
import { ResourceDescription } from '../../../../api/models/resource-description';
import { ResourceTypeService } from '../../../services/resource-type-service';
import { BaseRootModel } from '../../../../api/models/base-root-model';
import { getResourceStringRepresentation } from '../../../../helper/apollo-resource-utils';

@Component({
  selector: 'app-reference-field',
  templateUrl: './reference-field.component.html',
  styleUrls: ['./reference-field.component.scss']
})
export class ReferenceFieldComponent extends BaseField implements OnInit {

  private resourceService = inject(ResourceService);
  private resourceTypeService = inject(ResourceTypeService);

  private foreignResourceDescription: ResourceDescription;
  private linkedObject: BaseRootModel;

  get fieldContent(): string {
    return this._fieldContent;
  }

  set fieldContent(value: string) {
    this._fieldContent = value;
  }
  private _fieldContent = "";

  private allOptions: {name: string, object: BaseRootModel}[] = [];
  protected filteredOptions: {name: string, object: BaseRootModel}[] = [{
    name: "Loading",
    object: null,
  }];

  @Input() set prop(value) {
    this.baseProp = value;
    this.loadResourceType();
  }
  @Input() set resource(value) {
    this.baseResource = value;
    this.loadReferenceObject();
  }
  @Output() get onChanged(){
    return this.baseOnChanged;
  }

  ngOnInit(): void {

  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event)
  }

  private async loadResourceType() {
    this.resourceTypeService.resourceTypes.subscribe(resourceTypes => {

      this.foreignResourceDescription = resourceTypes.find(rt => rt.type === this.baseProp.embededTypeDefinition);
      console.log(this.foreignResourceDescription, this.baseProp);
    });
  }

  private async loadReferenceObject() {
    this.linkedObject = await this.resourceService.getResource(this.foreignResourceDescription.name, this.value);
    console.log(this.linkedObject, this.value, this.foreignResourceDescription.name);
    this.fieldContent = getResourceStringRepresentation(this.linkedObject, this.foreignResourceDescription);

  }

  panelOpened() {
    console.log('panel opened')
    this.loadOptions();
  }
  async loadOptions() {
    // TODO limitation to 10000 objects
    console.log(this.allOptions)
    let models = await this.resourceService.getResources(this.foreignResourceDescription.name, 0, 10000);
    this.allOptions = models.data.map(m => {
      return {
        name: getResourceStringRepresentation(m, this.foreignResourceDescription),
        object: m,
      }
    });
    this.filteredOptions = this.allOptions;
    console.log(this.allOptions)
  }
}
