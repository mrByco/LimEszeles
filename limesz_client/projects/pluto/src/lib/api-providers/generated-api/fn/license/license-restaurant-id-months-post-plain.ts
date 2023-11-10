/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LicenseInfo } from '../../models/license-info';
import { LicenseType } from '../../models/license-type';

export interface LicenseRestaurantIdMonthsPost$Plain$Params {
  restaurantId: string;
  months: number;
      body?: LicenseType
}

export function licenseRestaurantIdMonthsPost$Plain(http: HttpClient, rootUrl: string, params: LicenseRestaurantIdMonthsPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
  const rb = new RequestBuilder(rootUrl, licenseRestaurantIdMonthsPost$Plain.PATH, 'post');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.path('months', params.months, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LicenseInfo>;
    })
  );
}

licenseRestaurantIdMonthsPost$Plain.PATH = '/License/{restaurantId}/{months}';
