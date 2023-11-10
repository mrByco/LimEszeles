/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LicenseInfo } from '../../models/license-info';

export interface LicenseCurrentRestaurantIdGet$Plain$Params {
  restaurantId: string;
}

export function licenseCurrentRestaurantIdGet$Plain(http: HttpClient, rootUrl: string, params: LicenseCurrentRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
  const rb = new RequestBuilder(rootUrl, licenseCurrentRestaurantIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
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

licenseCurrentRestaurantIdGet$Plain.PATH = '/License/current/{restaurantId}';
