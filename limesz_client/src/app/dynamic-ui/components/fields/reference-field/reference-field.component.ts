import { Component, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseField } from '../base-field';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ResourceService } from 'src/app/dynamic-ui/services/resource-service';
import { ResourceDescription } from '../../../../api/models/resource-description';
import { ResourceTypeService } from '../../../services/resource-type-service';
import { BaseRootModel } from '../../../../api/models/base-root-model';
import { getResourceStringRepresentation } from '../../../../helper/apollo-resource-utils';
import Fuse from 'fuse.js'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reference-field',
  templateUrl: './reference-field.component.html',
  styleUrls: ['./reference-field.component.scss']
})
export class ReferenceFieldComponent extends BaseField implements OnInit {

  formControl = new FormControl();
  private resourceService = inject(ResourceService);
  private resourceTypeService = inject(ResourceTypeService);
  private fuse = new Fuse([], {keys: ['name']});

  private foreignResourceDescription: ResourceDescription;
  private linkedObject: BaseRootModel;

  private allOptions: {name: string, object: BaseRootModel}[] = [];
  protected filteredOptions: {name: string, object: any}[] = [{
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
    this.formControl.setValue({
      name: "Loading",
      object: null,
    });

    this.formControl.registerOnChange((value) => {

    });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
     let id = event.option.value.object.id
    console.log(id, event.option, this.baseResource, this.baseProp.jsAccessor);
     this.value = id;
  }

  private async loadResourceType() {
    this.resourceTypeService.resourceTypes.subscribe(resourceTypes => {
      this.foreignResourceDescription = resourceTypes.find(rt => rt.type === this.baseProp.embededTypeDefinition);
    });
  }

  private async loadReferenceObject() {
    this.linkedObject = await this.resourceService.getResource(this.foreignResourceDescription.name, this.value);

    this.formControl.setValue({
      name: this.displayObject(this.linkedObject),
      object: this.linkedObject,
    });
  }

  panelOpened() {
    this.loadOptions();
  }
  async loadOptions() {
    // TODO limitation to 10000 objects
    let models = await this.resourceService.getResources(this.foreignResourceDescription.name, 0, 10000);
    this.allOptions = models.data.map(m => {
      return {
        name: getResourceStringRepresentation(m, this.foreignResourceDescription),
        object: m,
      }
    });
    this.fuse.setCollection(this.allOptions);
    this.filterOptions(this.displayObject(this.linkedObject));
  }

  filterOptions(text: string) {
    this.filteredOptions = this.fuse.search(text, {limit: 15}).map(r => r.item);
    this.filteredOptions.push({
      name: "Create new",
      object: "CREATE_NEW",
    });
  }

  displayObject = (value) => {
    let object = value?.object;
    if (!object){
      return "Invalid reference";
    }
    if (typeof value.object === 'string'){
      return value.object;
    }

    return getResourceStringRepresentation(value.object, this.foreignResourceDescription);
  };

  onInput(input: string) {
    this.filterOptions(input);
  }
}
