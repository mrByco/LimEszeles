/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseRootModel } from '../../models/base-root-model';

export interface GetResource$Json$Params {
  resourceType: string;
  id: string;
}

export function getResource$Json(http: HttpClient, rootUrl: string, params: GetResource$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
  const rb = new RequestBuilder(rootUrl, getResource$Json.PATH, 'get');
  if (params) {
    rb.path('resourceType', params.resourceType, {});
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseRootModel>;
    })
  );
}

getResource$Json.PATH = '/Resource/get-resource/{resourceType}/{id}';
