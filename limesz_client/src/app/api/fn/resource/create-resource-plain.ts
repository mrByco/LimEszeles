/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseRootModel } from '../../models/base-root-model';

export interface CreateResource$Plain$Params {
  resourceType: string;
}

export function createResource$Plain(http: HttpClient, rootUrl: string, params: CreateResource$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
  const rb = new RequestBuilder(rootUrl, createResource$Plain.PATH, 'get');
  if (params) {
    rb.path('resourceType', params.resourceType, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BaseRootModel>;
    })
  );
}

createResource$Plain.PATH = '/Resource/create-resource/{resourceType}';
