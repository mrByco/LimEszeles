/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseRootModel } from '../../models/base-root-model';

export interface CreateResource$Json$Params {
  resourceType: string;
}

export function createResource$Json(http: HttpClient, rootUrl: string, params: CreateResource$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
  const rb = new RequestBuilder(rootUrl, createResource$Json.PATH, 'get');
  if (params) {
    rb.path('resourceType', params.resourceType, {});
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

createResource$Json.PATH = '/Resource/create-resource/{resourceType}';
