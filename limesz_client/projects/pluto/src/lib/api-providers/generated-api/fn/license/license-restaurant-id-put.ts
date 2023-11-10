/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LicenseInfo } from '../../models/license-info';

export interface LicenseRestaurantIdPut$Params {
  restaurantId: string;
      body?: LicenseInfo
}

export function licenseRestaurantIdPut(http: HttpClient, rootUrl: string, params: LicenseRestaurantIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, licenseRestaurantIdPut.PATH, 'put');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

licenseRestaurantIdPut.PATH = '/License/{restaurantId}';
