import { inject, Injectable } from '@angular/core';
import { ResourceDescription } from '../../api/models/resource-description';
import {ResourceService as ResourceApi} from '../../api/services/resource.service';
import { LoadingService } from '../../services/loading.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
