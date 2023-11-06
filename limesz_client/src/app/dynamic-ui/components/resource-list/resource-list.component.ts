import { Component, inject } from '@angular/core';
import { ResourceDescription } from '../../../api/models/resource-description';
import { ResourceService } from '../../services/resource-service';
import { ResourceTypeService } from '../../services/resource-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { GenericTableInput } from '../generic-table/generic-table.component';
import { create } from 'domain';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent {

  public resourceDefinition: ResourceDescription;

  private resourceService = inject(ResourceService);
  private resourceTypeService = inject(ResourceTypeService);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  tableInput: GenericTableInput;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(p => {
      this.loadResourceType(p.resourceName);
    })
  }

  public loadResourceType(resourceName: string) {
    this.resourceTypeService.resourceTypes.subscribe(resourceTypes => {
      this.resourceDefinition = resourceTypes.find(rt => rt.name === resourceName);
      this.updateInput(resourceName);
    })


  }

  private updateInput(resourceName: string){
    if (!this.resourceDefinition) {
      console.log('no resource definition')
      return;
    }
    this.tableInput = {
      allColumns: this.resourceDefinition.props.map(p => {
        console.log(p)
        return {
          name: p.jsAccessor,
          displayName: p.propName,
          canSortBy: false,
        }
      }),
      displayedColumns: this.resourceDefinition.props.map(p => p.jsAccessor),
      loadDataPaginated: async (pageNumber: number, pageSize: number) => {
        const resources = await this.resourceService.getResources(resourceName, pageNumber, pageSize);
        return {
          data: resources.data,
          total: resources.total
        }
      },
    }
  }

  navigateDetailsPage(data: any) {
    this.router.navigate(['resources', this.resourceDefinition.name, data.id])
  }

  protected readonly create = async () => {
    let created = await this.resourceService.createResource(this.resourceDefinition.name);
    await this.router.navigate(['/resources', this.resourceDefinition.name, created.id]);
  };
}
