/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ResourceDescription } from '../../models/resource-description';

export interface GetResourceTypes$Json$Params {
}

export function getResourceTypes$Json(http: HttpClient, rootUrl: string, params?: GetResourceTypes$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ResourceDescription>>> {
  const rb = new RequestBuilder(rootUrl, getResourceTypes$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ResourceDescription>>;
    })
  );
}

getResourceTypes$Json.PATH = '/Resource/get-resource-list';
