import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { BaseRootModel } from '../../api-providers/generated-api/models/base-root-model';
import { ResourceApi } from '../../api-providers/generated-api/services/resource-api';
import { PaginatedResourceResult } from '../../api-providers/generated-api/models/paginated-resource-result';
import { FieldChange } from '../../api-providers/generated-api/models/field-change';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private resourceApi: ResourceApi) { }

  public async getResources(resourceName: string, pageNumber: number, pageSize: number): Promise<PaginatedResourceResult> {
    return await firstValueFrom(this.resourceApi.getResourcesPaginated$Json({
      resourceType: resourceName,
      page: pageNumber,
      pageSize,
    }));
  }

  public async getResource(resourceName: string, id: any): Promise<any> {
    return await firstValueFrom(this.resourceApi.getResource$Json({
      resourceType: resourceName,
      id,
    }));
  }


  async createResource(name: string): Promise<BaseRootModel> {
    return await firstValueFrom(this.resourceApi.createResource$Json({
      resourceType: name,
    }));
  }

  async deleteResource(name: string, id: any) {
    await firstValueFrom(this.resourceApi.removeResource({
      resourceType: name,
      id,
    }));
  }

  async updateResource(name: string, id, changes: FieldChange[]) {
    function toCSharpPath(jsPath) {
      return jsPath.split('.').map(p => p[0].toUpperCase() + p.slice(1)).join('.');
    }

    let updateResurests = changes.map(change => {

      return {
        path: toCSharpPath(change.path),
        value: change.value,
      };
    });

    return await firstValueFrom(this.resourceApi.updateResource$Json({
      resourceType: name,
      id,
      body: updateResurests,
    }));
  }
}
