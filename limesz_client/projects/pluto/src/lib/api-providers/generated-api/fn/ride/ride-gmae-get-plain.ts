/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Ride } from '../../models/ride';

export interface RideGmaeGet$Plain$Params {
  rideId?: string;
}

export function rideGmaeGet$Plain(http: HttpClient, rootUrl: string, params?: RideGmaeGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Ride>> {
  const rb = new RequestBuilder(rootUrl, rideGmaeGet$Plain.PATH, 'get');
  if (params) {
    rb.query('rideId', params.rideId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Ride>;
    })
  );
}

rideGmaeGet$Plain.PATH = '/Ride/gmae';
