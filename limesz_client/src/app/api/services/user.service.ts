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

import { UserProfileDto } from '../models/user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userGet
   */
  static readonly UserGetPath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Plain$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Plain(params?: {
    context?: HttpContext
  }
): Observable<UserProfileDto> {

    return this.userGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Json$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Json(params?: {
    context?: HttpContext
  }
): Observable<UserProfileDto> {

    return this.userGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

  /**
   * Path part for operation userDelete
   */
  static readonly UserDeletePath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDelete$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserDeletePath, 'delete');
    if (params) {
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
   * To access the full response (for headers, for example), `userDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDelete(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.userDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userCheckPaymentUserIdUserIdGet
   */
  static readonly UserCheckPaymentUserIdUserIdGetPath = '/User/check-payment-user-id/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckPaymentUserIdUserIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Plain$Response(params: {
    userId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserCheckPaymentUserIdUserIdGetPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userCheckPaymentUserIdUserIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Plain(params: {
    userId: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.userCheckPaymentUserIdUserIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckPaymentUserIdUserIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Json$Response(params: {
    userId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserCheckPaymentUserIdUserIdGetPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userCheckPaymentUserIdUserIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Json(params: {
    userId: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.userCheckPaymentUserIdUserIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
