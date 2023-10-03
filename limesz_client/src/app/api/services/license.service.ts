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

import { LicenseInfo } from '../models/license-info';
import { LicenseType } from '../models/license-type';

@Injectable({
  providedIn: 'root',
})
export class LicenseService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation licenseRestaurantIdGet
   */
  static readonly LicenseRestaurantIdGetPath = '/License/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Plain$Response(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<LicenseInfo>>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseRestaurantIdGetPath, 'get');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LicenseInfo>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Plain(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<Array<LicenseInfo>> {

    return this.licenseRestaurantIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LicenseInfo>>) => r.body as Array<LicenseInfo>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Json$Response(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<LicenseInfo>>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseRestaurantIdGetPath, 'get');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LicenseInfo>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdGet$Json(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<Array<LicenseInfo>> {

    return this.licenseRestaurantIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LicenseInfo>>) => r.body as Array<LicenseInfo>)
    );
  }

  /**
   * Path part for operation licenseRestaurantIdPut
   */
  static readonly LicenseRestaurantIdPutPath = '/License/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdPut$Response(params: {
    restaurantId: string;
    context?: HttpContext
    body?: LicenseInfo
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseRestaurantIdPutPath, 'put');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdPut(params: {
    restaurantId: string;
    context?: HttpContext
    body?: LicenseInfo
  }
): Observable<void> {

    return this.licenseRestaurantIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation licenseCurrentRestaurantIdGet
   */
  static readonly LicenseCurrentRestaurantIdGetPath = '/License/current/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseCurrentRestaurantIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Plain$Response(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<LicenseInfo>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseCurrentRestaurantIdGetPath, 'get');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LicenseInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseCurrentRestaurantIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Plain(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<LicenseInfo> {

    return this.licenseCurrentRestaurantIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LicenseInfo>) => r.body as LicenseInfo)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseCurrentRestaurantIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Json$Response(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<LicenseInfo>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseCurrentRestaurantIdGetPath, 'get');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LicenseInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseCurrentRestaurantIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseCurrentRestaurantIdGet$Json(params: {
    restaurantId: string;
    context?: HttpContext
  }
): Observable<LicenseInfo> {

    return this.licenseCurrentRestaurantIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LicenseInfo>) => r.body as LicenseInfo)
    );
  }

  /**
   * Path part for operation licenseRestaurantIdMonthsPost
   */
  static readonly LicenseRestaurantIdMonthsPostPath = '/License/{restaurantId}/{months}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdMonthsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Plain$Response(params: {
    restaurantId: string;
    months: number;
    context?: HttpContext
    body?: LicenseType
  }
): Observable<StrictHttpResponse<LicenseInfo>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseRestaurantIdMonthsPostPath, 'post');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
      rb.path('months', params.months, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LicenseInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdMonthsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Plain(params: {
    restaurantId: string;
    months: number;
    context?: HttpContext
    body?: LicenseType
  }
): Observable<LicenseInfo> {

    return this.licenseRestaurantIdMonthsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LicenseInfo>) => r.body as LicenseInfo)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdMonthsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Json$Response(params: {
    restaurantId: string;
    months: number;
    context?: HttpContext
    body?: LicenseType
  }
): Observable<StrictHttpResponse<LicenseInfo>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseRestaurantIdMonthsPostPath, 'post');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
      rb.path('months', params.months, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LicenseInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdMonthsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  licenseRestaurantIdMonthsPost$Json(params: {
    restaurantId: string;
    months: number;
    context?: HttpContext
    body?: LicenseType
  }
): Observable<LicenseInfo> {

    return this.licenseRestaurantIdMonthsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LicenseInfo>) => r.body as LicenseInfo)
    );
  }

  /**
   * Path part for operation licenseRestaurantIdLicenseIdDelete
   */
  static readonly LicenseRestaurantIdLicenseIdDeletePath = '/License/{restaurantId}/{licenseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `licenseRestaurantIdLicenseIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdLicenseIdDelete$Response(params: {
    restaurantId: string;
    licenseId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LicenseService.LicenseRestaurantIdLicenseIdDeletePath, 'delete');
    if (params) {
      rb.path('restaurantId', params.restaurantId, {});
      rb.path('licenseId', params.licenseId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `licenseRestaurantIdLicenseIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  licenseRestaurantIdLicenseIdDelete(params: {
    restaurantId: string;
    licenseId: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.licenseRestaurantIdLicenseIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
