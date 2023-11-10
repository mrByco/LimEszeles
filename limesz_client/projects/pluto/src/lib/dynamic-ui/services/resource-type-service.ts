import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from '../../api-providers/default-services/loading.service';
import { ResourceApi } from '../../api-providers/generated-api/services';
import { ResourceDescription } from '../../api-providers/generated-api/models/resource-description';

@Injectable({
  providedIn: 'root'
})
export class ResourceTypeService {

  private loadingService = inject(LoadingService);
  private resourceApi = inject(ResourceApi);

  public resourceTypes = new BehaviorSubject<ResourceDescription[]>([]);

  constructor() {
    this.load();
  }

  private async load() {
    this.resourceTypes.next(await this.loadingService.waitFirstValueFrom(
      this.resourceApi.getResourceTypes$Json()
    ));
  }
}
