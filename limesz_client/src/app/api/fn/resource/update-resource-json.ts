/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BaseRootModel } from '../../models/base-root-model';
import { FieldChange } from '../../models/field-change';

export interface UpdateResource$Json$Params {
  resourceType: string;
  id: string;
      body?: Array<FieldChange>
}

export function updateResource$Json(http: HttpClient, rootUrl: string, params: UpdateResource$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
  const rb = new RequestBuilder(rootUrl, updateResource$Json.PATH, 'post');
  if (params) {
    rb.path('resourceType', params.resourceType, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/*+json');
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

updateResource$Json.PATH = '/Resource/update-resource/{resourceType}/{id}';
