/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GenericObject } from '../../models/generic-object';

export interface GetAvailableDataContexts$Plain$Params {
}

export function getAvailableDataContexts$Plain(http: HttpClient, rootUrl: string, params?: GetAvailableDataContexts$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GenericObject>>> {
  const rb = new RequestBuilder(rootUrl, getAvailableDataContexts$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GenericObject>>;
    })
  );
}

getAvailableDataContexts$Plain.PATH = '/Resource/data-contexts';
