/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Ride } from '../models/ride';
import { rideGmaeGet$Json } from '../fn/ride/ride-gmae-get-json';
import { RideGmaeGet$Json$Params } from '../fn/ride/ride-gmae-get-json';
import { rideGmaeGet$Plain } from '../fn/ride/ride-gmae-get-plain';
import { RideGmaeGet$Plain$Params } from '../fn/ride/ride-gmae-get-plain';
import { rideRideIdGet$Json } from '../fn/ride/ride-ride-id-get-json';
import { RideRideIdGet$Json$Params } from '../fn/ride/ride-ride-id-get-json';
import { rideRideIdGet$Plain } from '../fn/ride/ride-ride-id-get-plain';
import { RideRideIdGet$Plain$Params } from '../fn/ride/ride-ride-id-get-plain';

@Injectable({ providedIn: 'root' })
export class RideApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rideRideIdGet()` */
  static readonly RideRideIdGetPath = '/Ride/{rideId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rideRideIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Plain$Response(params: RideRideIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Ride>> {
    return rideRideIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rideRideIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Plain(params: RideRideIdGet$Plain$Params, context?: HttpContext): Observable<Ride> {
    return this.rideRideIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ride>): Ride => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rideRideIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Json$Response(params: RideRideIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Ride>> {
    return rideRideIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rideRideIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideRideIdGet$Json(params: RideRideIdGet$Json$Params, context?: HttpContext): Observable<Ride> {
    return this.rideRideIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ride>): Ride => r.body)
    );
  }

  /** Path part for operation `rideGmaeGet()` */
  static readonly RideGmaeGetPath = '/Ride/gmae';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rideGmaeGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideGmaeGet$Plain$Response(params?: RideGmaeGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Ride>> {
    return rideGmaeGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rideGmaeGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideGmaeGet$Plain(params?: RideGmaeGet$Plain$Params, context?: HttpContext): Observable<Ride> {
    return this.rideGmaeGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ride>): Ride => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rideGmaeGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideGmaeGet$Json$Response(params?: RideGmaeGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Ride>> {
    return rideGmaeGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rideGmaeGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rideGmaeGet$Json(params?: RideGmaeGet$Json$Params, context?: HttpContext): Observable<Ride> {
    return this.rideGmaeGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ride>): Ride => r.body)
    );
  }

}
