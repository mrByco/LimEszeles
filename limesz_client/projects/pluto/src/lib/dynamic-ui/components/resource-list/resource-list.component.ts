import { Component, inject } from '@angular/core';
import { ResourceService } from '../../services/resource-service';
import { ResourceTypeService } from '../../services/resource-type-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericTableInput } from '../generic-table/generic-table.component';
import { ResourceDescription } from '../../../api-providers/generated-api/models/resource-description';
import { LoadingService } from '../../../api-providers/default-services/loading.service';
import { getPropertyByJsPath } from '../../../helpers/apollo-resource-utils';

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
        let accessor = (value) => getPropertyByJsPath(value, p.jsAccessor);

        if (p.propType === 'object' && p.propOptions.stringRepresentationFieldName){
          accessor = (value: any) => getPropertyByJsPath(value, p.jsAccessor + '.' + p.propOptions.stringRepresentationFieldName);
        }

        if (p.propType === 'list'
          && !p.propOptions.stringRepresentationFieldName
          && p.embededTypeDefinition.propType == "object"
          && p.embededTypeDefinition.propOptions.stringRepresentationFieldName) {
          accessor = ((value: any) => {
            let objectList = getPropertyByJsPath(value, p.jsAccessor)
            let names = objectList.map(o => getPropertyByJsPath(o, p.embededTypeDefinition.propOptions.stringRepresentationFieldName));
            return names.join(', ');
          })
        }

        return {
          name: p.propName,
          accessor: accessor,
          displayName: p.propName,
          canSortBy: false
        }
      }),
      displayedColumns: this.resourceDefinition.props.map(p => p.propName),
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
