/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedResourceResult } from '../../models/paginated-resource-result';

export interface GetResourcesPaginated$Plain$Params {
  resourceType: string;
  page: number;
  pageSize: number;
}

export function getResourcesPaginated$Plain(http: HttpClient, rootUrl: string, params: GetResourcesPaginated$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedResourceResult>> {
  const rb = new RequestBuilder(rootUrl, getResourcesPaginated$Plain.PATH, 'get');
  if (params) {
    rb.path('resourceType', params.resourceType, {});
    rb.path('page', params.page, {});
    rb.path('pageSize', params.pageSize, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginatedResourceResult>;
    })
  );
}

getResourcesPaginated$Plain.PATH = '/Resource/get-resources-paginated/{resourceType}/{page}/{pageSize}';
