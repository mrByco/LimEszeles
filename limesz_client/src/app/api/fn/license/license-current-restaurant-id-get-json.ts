/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LicenseInfo } from '../../models/license-info';

export interface LicenseCurrentRestaurantIdGet$Json$Params {
  restaurantId: string;
}

export function licenseCurrentRestaurantIdGet$Json(http: HttpClient, rootUrl: string, params: LicenseCurrentRestaurantIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
  const rb = new RequestBuilder(rootUrl, licenseCurrentRestaurantIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LicenseInfo>;
    })
  );
}

licenseCurrentRestaurantIdGet$Json.PATH = '/License/current/{restaurantId}';
