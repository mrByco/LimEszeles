import { Component, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseField } from '../base-field';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ResourceService } from '../../../services/resource-service';

import Fuse from 'fuse.js'
import { FormControl } from '@angular/forms';
import { ResourceDescription } from '../../../../api-providers/generated-api/models/resource-description';
import { BaseRootModel } from '../../../../api-providers/generated-api/models/base-root-model';
import { ResourceTypeService } from '../../../services/resource-type-service';
import { getResourceStringRepresentation } from '../../../../helpers/apollo-resource-utils';

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

  @Input() set prop(value) {
    this.baseProp = value;
  }

  private allOptions: {name: string, object: BaseRootModel}[] = [];
  protected filteredOptions: {name: string, object: any}[] = [{
    name: "Loading",
    object: null,
  }];

  async ngOnInit() {
    this.formControl.setValue({
      name: "Loading",
      object: null,
    });

    this.formControl.registerOnChange((value) => {

    });

    await this.loadResourceType();
    await this.loadReferenceObject();
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
     let id = event.option.value.object.id
    //console.log(id, event.option, this.baseResource, this.baseProp.jsAccessor);
     this.value = id;
  }

  private async loadResourceType() {
    this.resourceTypeService.resourceTypes.subscribe(resourceTypes => {
      this.foreignResourceDescription = resourceTypes.find(rt => rt.type === this.baseProp.embededTypeDefinition);
    });
  }

  private async loadReferenceObject() {
    console.log(this.value)
    if (this.value == null){
      this.formControl.setValue({
        name: "Not set",
        object: null,
      });
      return;
    }
    this.linkedObject = await this.resourceService.getResource(this.foreignResourceDescription.name, this.value);
    if (!this.linkedObject){
      this.formControl.setValue({
        name: "Invalid reference",
        object: null,
      });
    }else {
      this.formControl.setValue({
        name: this.displayObject(this.linkedObject),
        object: this.linkedObject,
      });
    }
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
    if (!this.linkedObject){
      this.filterOptions("");
    }else {
      this.filterOptions(this.displayObject(this.linkedObject));
    }
  }

  filterOptions(text: string) {
    console.log("Filtering options", text);
    this.filteredOptions = this.fuse.search(text, {limit: 15}).map(r => r?.item??"");
    this.filteredOptions.push({
      name: "Create new",
      object: "CREATE_NEW",
    });
  }

  displayObject = (value) => {
    let object = value?.object;
    if (!object){
      return value?.name;
    }
    if (typeof value.object === 'string'){
      return value.object;
    }

    return getResourceStringRepresentation(value.object, this.foreignResourceDescription);
  };

  onInput(input: string) {
    this.filterOptions(input);
  }

  @Input()
  fullJsAccessor: string;
}
