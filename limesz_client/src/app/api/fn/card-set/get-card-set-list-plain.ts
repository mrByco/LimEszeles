/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardSet } from '../../models/card-set';

export interface GetCardSetList$Plain$Params {
}

export function getCardSetList$Plain(http: HttpClient, rootUrl: string, params?: GetCardSetList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardSet>>> {
  const rb = new RequestBuilder(rootUrl, getCardSetList$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardSet>>;
    })
  );
}

getCardSetList$Plain.PATH = '/CardSet/get-card-set-list';
