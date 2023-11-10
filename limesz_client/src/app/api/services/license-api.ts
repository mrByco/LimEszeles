/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { licenseCurrentRestaurantIdGet$Json } from '../fn/license/license-current-restaurant-id-get-json';
import { LicenseCurrentRestaurantIdGet$Json$Params } from '../fn/license/license-current-restaurant-id-get-json';
import { licenseCurrentRestaurantIdGet$Plain } from '../fn/license/license-current-restaurant-id-get-plain';
import { LicenseCurrentRestaurantIdGet$Plain$Params } from '../fn/license/license-current-restaurant-id-get-plain';
import { LicenseInfo } from '../models/license-info';
import { licenseRestaurantIdGet$Json } from '../fn/license/license-restaurant-id-get-json';
import { LicenseRestaurantIdGet$Json$Params } from '../fn/license/license-restaurant-id-get-json';
import { licenseRestaurantIdGet$Plain } from '../fn/license/license-restaurant-id-get-plain';
import { LicenseRestaurantIdGet$Plain$Params } from '../fn/license/license-restaurant-id-get-plain';
import { licenseRestaurantIdLicenseIdDelete } from '../fn/license/license-restaurant-id-license-id-delete';
import { LicenseRestaurantIdLicenseIdDelete$Params } from '../fn/license/license-restaurant-id-license-id-delete';
import { licenseRestaurantIdMonthsPost$Json } from '../fn/license/license-restaurant-id-months-post-json';
import { LicenseRestaurantIdMonthsPost$Json$Params } from '../fn/license/license-restaurant-id-months-post-json';
import { licenseRestaurantIdMonthsPost$Plain } from '../fn/license/license-restaurant-id-months-post-plain';
import { LicenseRestaurantIdMonthsPost$Plain$Params } from '../fn/license/license-restaurant-id-months-post-plain';
import { licenseRestaurantIdPut } from '../fn/license/license-restaurant-id-put';
import { LicenseRestaurantIdPut$Params } from '../fn/license/license-restaurant-id-put';

@Injectable({ providedIn: 'root' })
export class LicenseApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `licenseRestaurantIdGet()` */
  static readonly LicenseRestaurantIdGetPath = '/License/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Plain$Response(params: LicenseRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LicenseInfo>>> {
    return licenseRestaurantIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Plain(params: LicenseRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<Array<LicenseInfo>> {
    return this.licenseRestaurantIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LicenseInfo>>): Array<LicenseInfo> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Json$Response(params: LicenseRestaurantIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LicenseInfo>>> {
    return licenseRestaurantIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Json(params: LicenseRestaurantIdGet$Json$Params, context?: HttpContext): Observable<Array<LicenseInfo>> {
    return this.licenseRestaurantIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LicenseInfo>>): Array<LicenseInfo> => r.body)
    );
  }

  /** Path part for operation `licenseRestaurantIdPut()` */
  static readonly LicenseRestaurantIdPutPath = '/License/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdPut$Response(params: LicenseRestaurantIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return licenseRestaurantIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdPut(params: LicenseRestaurantIdPut$Params, context?: HttpContext): Observable<void> {
    return this.licenseRestaurantIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `licenseCurrentRestaurantIdGet()` */
  static readonly LicenseCurrentRestaurantIdGetPath = '/License/current/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseCurrentRestaurantIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Plain$Response(params: LicenseCurrentRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
    return licenseCurrentRestaurantIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseCurrentRestaurantIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Plain(params: LicenseCurrentRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<LicenseInfo> {
    return this.licenseCurrentRestaurantIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LicenseInfo>): LicenseInfo => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseCurrentRestaurantIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Json$Response(params: LicenseCurrentRestaurantIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
    return licenseCurrentRestaurantIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseCurrentRestaurantIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Json(params: LicenseCurrentRestaurantIdGet$Json$Params, context?: HttpContext): Observable<LicenseInfo> {
    return this.licenseCurrentRestaurantIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<LicenseInfo>): LicenseInfo => r.body)
    );
  }

  /** Path part for operation `licenseRestaurantIdMonthsPost()` */
  static readonly LicenseRestaurantIdMonthsPostPath = '/License/{restaurantId}/{months}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdMonthsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Plain$Response(params: LicenseRestaurantIdMonthsPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
    return licenseRestaurantIdMonthsPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdMonthsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Plain(params: LicenseRestaurantIdMonthsPost$Plain$Params, context?: HttpContext): Observable<LicenseInfo> {
    return this.licenseRestaurantIdMonthsPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LicenseInfo>): LicenseInfo => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdMonthsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Json$Response(params: LicenseRestaurantIdMonthsPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<LicenseInfo>> {
    return licenseRestaurantIdMonthsPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdMonthsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Json(params: LicenseRestaurantIdMonthsPost$Json$Params, context?: HttpContext): Observable<LicenseInfo> {
    return this.licenseRestaurantIdMonthsPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<LicenseInfo>): LicenseInfo => r.body)
    );
  }

  /** Path part for operation `licenseRestaurantIdLicenseIdDelete()` */
  static readonly LicenseRestaurantIdLicenseIdDeletePath = '/License/{restaurantId}/{licenseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdLicenseIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdLicenseIdDelete$Response(params: LicenseRestaurantIdLicenseIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return licenseRestaurantIdLicenseIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdLicenseIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdLicenseIdDelete(params: LicenseRestaurantIdLicenseIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.licenseRestaurantIdLicenseIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
