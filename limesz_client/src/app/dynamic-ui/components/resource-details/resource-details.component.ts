import { Component, inject } from '@angular/core';
import { ResourceDescription } from '../../../api/models/resource-description';
import { ResourceService } from '../../services/resource-service';
import { ResourceTypeService } from '../../services/resource-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent {

    public resourceDefinition: ResourceDescription;
    public resource: any;

    private resourceService = inject(ResourceService);
    private resourceTypeService = inject(ResourceTypeService);
    private router = inject(Router);
    private loadingService = inject(LoadingService);

    constructor(activatedRoute: ActivatedRoute) {
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
    this.resource = await this.resourceService.getResource(resourceName, id)

  }
}
