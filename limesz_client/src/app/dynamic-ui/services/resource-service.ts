import { Injectable } from '@angular/core';
import { ResourceService as ResourceApi } from '../../api/services/resource.service';
import { firstValueFrom } from 'rxjs';
import { PaginatedResourceResult } from 'src/app/api/models';

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


  async createResource(name: string) {
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
}
