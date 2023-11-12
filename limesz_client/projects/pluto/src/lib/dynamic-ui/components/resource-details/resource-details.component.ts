import { Component, inject } from '@angular/core';
import { ResourceService } from '../../services/resource-service';
import { ResourceTypeService } from '../../services/resource-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../api-providers/default-services/loading.service';
import { FieldChange } from '../../../api-providers/generated-api/models/field-change';
import { ResourceDescription } from '../../../api-providers/generated-api/models/resource-description';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
})
export class ResourceDetailsComponent {

  public resourceDefinition: ResourceDescription;
  public resource: any;

  private resourceService = inject(ResourceService);
  private resourceTypeService = inject(ResourceTypeService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  private changes: FieldChange[] = [];

  constructor(protected activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(p => {
      let resourceName = p.resourceName;
      let id = p.id;
      if (!resourceName || !id) {
        return;
      }
      this.init(resourceName, id);
    });
  }

  private init(resourceName: string, id: any) {
    this.resourceTypeService.resourceTypes.subscribe(resourceTypes => {
      this.resourceDefinition = resourceTypes.find(rt => rt.name === resourceName);
      this.loadResource(resourceName, id);
    });
  }

  private async loadResource(resourceName: string, id: any) {
    this.resource = await this.resourceService.getResource(resourceName, id);
  }

  protected removeResource = async () => {
    await this.resourceService.deleteResource(this.resourceDefinition.name, this.resource.id);
    await this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  };

  public registerChange = (path: string, value: any) => {

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
      this.changes.forEach(c => console.log(c.path + " = " + c.value.toString()));
    }
  };

  updateResource = async () => {
    this.resource = await this.resourceService.updateResource(this.resourceDefinition.name, this.resource.id, this.changes);
    this.changes = [];

  };

}