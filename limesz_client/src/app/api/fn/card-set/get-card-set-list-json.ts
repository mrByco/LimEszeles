/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardSet } from '../../models/card-set';

export interface GetCardSetList$Json$Params {
}

export function getCardSetList$Json(http: HttpClient, rootUrl: string, params?: GetCardSetList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardSet>>> {
  const rb = new RequestBuilder(rootUrl, getCardSetList$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardSet>>;
    })
  );
}

getCardSetList$Json.PATH = '/CardSet/get-card-set-list';
