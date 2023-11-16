import {
  Directive, EmbeddedViewRef,
  Host,
  inject,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ResourceDescription } from '../../api-providers/generated-api/models/resource-description';
import { ResourceService } from '../services/resource-service';
import { ResourceTypeService } from '../services/resource-type-service';
import { FieldChange } from '../../api-providers/generated-api/models/field-change';

export interface PlResourceContext<T> {
  $implicit: T;
  definition: ResourceDescription;
}

@Directive({
  selector: '[plResourceFrom]',
})
export class PlResource implements OnInit {

  public resourceDefinition: ResourceDescription;
  public data: any;

  private resourceService = inject(ResourceService);
  private resourceTypeService = inject(ResourceTypeService);

  private embeddedViewRef: EmbeddedViewRef<any>;

  private changes: FieldChange[] = [];

  @Input() plResourceFrom: string | ResourceDescription;
  @Input() plResourceId: any;

  parents: PlResource[];

  constructor(@SkipSelf() @Optional() parent: PlResource,
            private templateRef: TemplateRef<any>,
            private viewContainer: ViewContainerRef,
  ) {
    this.parents = parent ? parent.parents.concat([parent]) : [];
    this.updateView();
  }

  ngOnInit(): void {
    if (typeof this.plResourceFrom == 'string') {
      this.init(this.plResourceFrom, this.plResourceId);
    }
  }

  private updateView() {
    let viewShouldBeVisible = this.resourceDefinition && this.data;
    if (viewShouldBeVisible && !this.embeddedViewRef) {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.getContext())
    }
    if (!viewShouldBeVisible && this.embeddedViewRef) {
      this.embeddedViewRef.destroy();
      this.embeddedViewRef = null;
    }

    if (this.embeddedViewRef){
      this.embeddedViewRef.context.$implicit = this.data;
      this.embeddedViewRef.context.definition = this.resourceDefinition;
    }
  }

  private getContext(): PlResourceContext<any> {
    return {
      $implicit: this.data,
      definition: this.resourceDefinition,
    };
  }

  private init(resourceType: string, id: any) {

    this.resourceTypeService.resourceTypes.subscribe(resourceTypes => {
      this.resourceDefinition = resourceTypes.find(rt => rt.name === resourceType);
      this.loadResourceData(resourceType, id);
    });
  }

  private async loadResourceData(resourceName: string, id: any) {
    this.data = await this.resourceService.getResource(resourceName, id);
    this.updateView();
  }

  public registerChange = (path: string, value: any) => {
    if (value === undefined || value === null) {
      value = "$SET_NULL$";
    }
    if (!path){
      // print stack trace
      // console.log("Path is null");
      // console.log(new Error().stack);
    }

    function isCommand(value): boolean {
      return typeof value === "string" && value.startsWith('$') && value.endsWith('$');
    }
    let lastWasCommand = isCommand(this.changes[this.changes.length - 1]?.value)
    let currentIsCommand = isCommand(value)

    let lastWasSamePath = this.changes.length > 0 && this.changes[this.changes.length - 1].path === path;

    if (!currentIsCommand && !lastWasCommand && lastWasSamePath) {
      this.changes[this.changes.length - 1].value = value;
    }else {
      this.changes.push({ path: path, value: value });
      console.log("Changes:");
      console.log(this.changes);
      this.changes.forEach(c => console.log(c.path + " = " + c.value?.toString()));
    }
  };

  save = async () => {
    this.data = await this.resourceService.updateResource(this.resourceDefinition.name, this.data.id, this.changes);
    this.changes = [];

  };


  async remove() {

    await this.resourceService.deleteResource(this.resourceDefinition.name, this.data.id);
  }
}
