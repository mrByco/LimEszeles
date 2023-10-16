/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Ride } from '../models/ride';

@Injectable({
  providedIn: 'root',
})
export class RideService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation rideRideIdGet
   */
  static readonly RideRideIdGetPath = '/Ride/{rideId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rideRideIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Plain$Response(params: {
    rideId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Ride>> {

    const rb = new RequestBuilder(this.rootUrl, RideService.RideRideIdGetPath, 'get');
    if (params) {
      rb.path('rideId', params.rideId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Ride>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rideRideIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Plain(params: {
    rideId: string;
    context?: HttpContext
  }
): Observable<Ride> {

    return this.rideRideIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Ride>) => r.body as Ride)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rideRideIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Json$Response(params: {
    rideId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Ride>> {

    const rb = new RequestBuilder(this.rootUrl, RideService.RideRideIdGetPath, 'get');
    if (params) {
      rb.path('rideId', params.rideId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Ride>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rideRideIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Json(params: {
    rideId: string;
    context?: HttpContext
  }
): Observable<Ride> {

    return this.rideRideIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Ride>) => r.body as Ride)
    );
  }

}
