/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Ride } from '../../models/ride';

export interface RideGmaeGet$Json$Params {
  rideId?: string;
}

export function rideGmaeGet$Json(http: HttpClient, rootUrl: string, params?: RideGmaeGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Ride>> {
  const rb = new RequestBuilder(rootUrl, rideGmaeGet$Json.PATH, 'get');
  if (params) {
    rb.query('rideId', params.rideId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Ride>;
    })
  );
}

rideGmaeGet$Json.PATH = '/Ride/gmae';
