import { Component, inject } from '@angular/core';
import { ResourceDescription } from '../../../api/models/resource-description';
import { ResourceService } from '../../services/resource-service';
import { ResourceTypeService } from '../../services/resource-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';

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

  private changes: { [key: string]: any } = {};

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
    console.log(this.resource);
  }

  protected removeResource = async () => {
    await this.resourceService.deleteResource(this.resourceDefinition.name, this.resource.id);
    await this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  };

  public registerChange = (path: string, value: any) => {
    this.changes[path] = value;
  };

  updateResource = async () => {
    await this.resourceService.updateResource(this.resourceDefinition.name, this.resource.id, this.changes);
    this.changes = {};
  };

}
