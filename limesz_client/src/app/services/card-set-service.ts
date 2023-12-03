import { inject, Injectable } from '@angular/core';
import { CardSetApi } from '../api/services';
import { CardSet } from '../api/models/card-set';
import { LoadingService } from 'pluto/src/lib/api-providers/default-services/loading.service';

@Injectable({
  providedIn: 'root'

})
export class CardSetService {
    cardSetApi = inject(CardSetApi);
    loadingService = inject(LoadingService);
    public cardSets: CardSet[] = [];

    constructor() {
      this.load()
    }

  private async load() {
    this.cardSets = await this.loadingService.waitFirstValueFrom(this.cardSetApi.getCardSetList$Json())
  }
}
