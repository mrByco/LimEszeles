/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { userCheckPaymentUserIdUserIdGet$Json } from '../fn/user/user-check-payment-user-id-user-id-get-json';
import { UserCheckPaymentUserIdUserIdGet$Json$Params } from '../fn/user/user-check-payment-user-id-user-id-get-json';
import { userCheckPaymentUserIdUserIdGet$Plain } from '../fn/user/user-check-payment-user-id-user-id-get-plain';
import { UserCheckPaymentUserIdUserIdGet$Plain$Params } from '../fn/user/user-check-payment-user-id-user-id-get-plain';
import { userDelete } from '../fn/user/user-delete';
import { UserDelete$Params } from '../fn/user/user-delete';
import { userGet$Json } from '../fn/user/user-get-json';
import { UserGet$Json$Params } from '../fn/user/user-get-json';
import { userGet$Plain } from '../fn/user/user-get-plain';
import { UserGet$Plain$Params } from '../fn/user/user-get-plain';
import { UserProfileDto } from '../models/user-profile-dto';

@Injectable({ providedIn: 'root' })
export class UserApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userGet()` */
  static readonly UserGetPath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Plain$Response(params?: UserGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
    return userGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Plain(params?: UserGet$Plain$Params, context?: HttpContext): Observable<UserProfileDto> {
    return this.userGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Json$Response(params?: UserGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserProfileDto>> {
    return userGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGet$Json(params?: UserGet$Json$Params, context?: HttpContext): Observable<UserProfileDto> {
    return this.userGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>): UserProfileDto => r.body)
    );
  }

  /** Path part for operation `userDelete()` */
  static readonly UserDeletePath = '/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDelete$Response(params?: UserDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDelete(params?: UserDelete$Params, context?: HttpContext): Observable<void> {
    return this.userDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userCheckPaymentUserIdUserIdGet()` */
  static readonly UserCheckPaymentUserIdUserIdGetPath = '/User/check-payment-user-id/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckPaymentUserIdUserIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Plain$Response(params: UserCheckPaymentUserIdUserIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return userCheckPaymentUserIdUserIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckPaymentUserIdUserIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Plain(params: UserCheckPaymentUserIdUserIdGet$Plain$Params, context?: HttpContext): Observable<string> {
    return this.userCheckPaymentUserIdUserIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckPaymentUserIdUserIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Json$Response(params: UserCheckPaymentUserIdUserIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return userCheckPaymentUserIdUserIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckPaymentUserIdUserIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCheckPaymentUserIdUserIdGet$Json(params: UserCheckPaymentUserIdUserIdGet$Json$Params, context?: HttpContext): Observable<string> {
    return this.userCheckPaymentUserIdUserIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
