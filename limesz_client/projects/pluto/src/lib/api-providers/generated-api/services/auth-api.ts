/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authCreatePasswordResetTokenEmailQueryParamsPost } from '../fn/auth/auth-create-password-reset-token-email-query-params-post';
import { AuthCreatePasswordResetTokenEmailQueryParamsPost$Params } from '../fn/auth/auth-create-password-reset-token-email-query-params-post';
import { authHasPermissionPermissionRestaurantIdGet$Json } from '../fn/auth/auth-has-permission-permission-restaurant-id-get-json';
import { AuthHasPermissionPermissionRestaurantIdGet$Json$Params } from '../fn/auth/auth-has-permission-permission-restaurant-id-get-json';
import { authHasPermissionPermissionRestaurantIdGet$Plain } from '../fn/auth/auth-has-permission-permission-restaurant-id-get-plain';
import { AuthHasPermissionPermissionRestaurantIdGet$Plain$Params } from '../fn/auth/auth-has-permission-permission-restaurant-id-get-plain';
import { authLoginPost$Json } from '../fn/auth/auth-login-post-json';
import { AuthLoginPost$Json$Params } from '../fn/auth/auth-login-post-json';
import { authLoginPost$Plain } from '../fn/auth/auth-login-post-plain';
import { AuthLoginPost$Plain$Params } from '../fn/auth/auth-login-post-plain';
import { authProtectedGet$Json } from '../fn/auth/auth-protected-get-json';
import { AuthProtectedGet$Json$Params } from '../fn/auth/auth-protected-get-json';
import { authProtectedGet$Plain } from '../fn/auth/auth-protected-get-plain';
import { AuthProtectedGet$Plain$Params } from '../fn/auth/auth-protected-get-plain';
import { authRefreshTokenPost$Json } from '../fn/auth/auth-refresh-token-post-json';
import { AuthRefreshTokenPost$Json$Params } from '../fn/auth/auth-refresh-token-post-json';
import { authRefreshTokenPost$Plain } from '../fn/auth/auth-refresh-token-post-plain';
import { AuthRefreshTokenPost$Plain$Params } from '../fn/auth/auth-refresh-token-post-plain';
import { authRegisterPost$Json } from '../fn/auth/auth-register-post-json';
import { AuthRegisterPost$Json$Params } from '../fn/auth/auth-register-post-json';
import { authRegisterPost$Plain } from '../fn/auth/auth-register-post-plain';
import { AuthRegisterPost$Plain$Params } from '../fn/auth/auth-register-post-plain';
import { authResetPasswordPost$Json } from '../fn/auth/auth-reset-password-post-json';
import { AuthResetPasswordPost$Json$Params } from '../fn/auth/auth-reset-password-post-json';
import { authResetPasswordPost$Plain } from '../fn/auth/auth-reset-password-post-plain';
import { AuthResetPasswordPost$Plain$Params } from '../fn/auth/auth-reset-password-post-plain';
import { AuthResult } from '../models/auth-result';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authLoginPost()` */
  static readonly AuthLoginPostPath = '/Auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Plain$Response(params?: AuthLoginPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authLoginPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Plain(params?: AuthLoginPost$Plain$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authLoginPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Json$Response(params?: AuthLoginPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authLoginPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Json(params?: AuthLoginPost$Json$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authLoginPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /** Path part for operation `authRegisterPost()` */
  static readonly AuthRegisterPostPath = '/Auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRegisterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Plain$Response(params?: AuthRegisterPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authRegisterPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRegisterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Plain(params?: AuthRegisterPost$Plain$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authRegisterPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRegisterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Json$Response(params?: AuthRegisterPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authRegisterPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRegisterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Json(params?: AuthRegisterPost$Json$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authRegisterPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /** Path part for operation `authRefreshTokenPost()` */
  static readonly AuthRefreshTokenPostPath = '/Auth/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRefreshTokenPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Plain$Response(params?: AuthRefreshTokenPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authRefreshTokenPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRefreshTokenPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Plain(params?: AuthRefreshTokenPost$Plain$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authRefreshTokenPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRefreshTokenPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Json$Response(params?: AuthRefreshTokenPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authRefreshTokenPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRefreshTokenPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Json(params?: AuthRefreshTokenPost$Json$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authRefreshTokenPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /** Path part for operation `authCreatePasswordResetTokenEmailQueryParamsPost()` */
  static readonly AuthCreatePasswordResetTokenEmailQueryParamsPostPath = '/Auth/create-password-reset-token/{email}/{queryParams}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCreatePasswordResetTokenEmailQueryParamsPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCreatePasswordResetTokenEmailQueryParamsPost$Response(params: AuthCreatePasswordResetTokenEmailQueryParamsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authCreatePasswordResetTokenEmailQueryParamsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCreatePasswordResetTokenEmailQueryParamsPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCreatePasswordResetTokenEmailQueryParamsPost(params: AuthCreatePasswordResetTokenEmailQueryParamsPost$Params, context?: HttpContext): Observable<void> {
    return this.authCreatePasswordResetTokenEmailQueryParamsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authResetPasswordPost()` */
  static readonly AuthResetPasswordPostPath = '/Auth/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResetPasswordPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Plain$Response(params?: AuthResetPasswordPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authResetPasswordPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authResetPasswordPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Plain(params?: AuthResetPasswordPost$Plain$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authResetPasswordPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResetPasswordPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Json$Response(params?: AuthResetPasswordPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResult>> {
    return authResetPasswordPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authResetPasswordPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Json(params?: AuthResetPasswordPost$Json$Params, context?: HttpContext): Observable<AuthResult> {
    return this.authResetPasswordPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResult>): AuthResult => r.body)
    );
  }

  /** Path part for operation `authProtectedGet()` */
  static readonly AuthProtectedGetPath = '/Auth/protected';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProtectedGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Plain$Response(params?: AuthProtectedGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return authProtectedGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProtectedGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Plain(params?: AuthProtectedGet$Plain$Params, context?: HttpContext): Observable<User> {
    return this.authProtectedGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProtectedGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Json$Response(params?: AuthProtectedGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return authProtectedGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProtectedGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Json(params?: AuthProtectedGet$Json$Params, context?: HttpContext): Observable<User> {
    return this.authProtectedGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `authHasPermissionPermissionRestaurantIdGet()` */
  static readonly AuthHasPermissionPermissionRestaurantIdGetPath = '/Auth/has-permission/{permission}/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authHasPermissionPermissionRestaurantIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Plain$Response(params: AuthHasPermissionPermissionRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authHasPermissionPermissionRestaurantIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authHasPermissionPermissionRestaurantIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Plain(params: AuthHasPermissionPermissionRestaurantIdGet$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.authHasPermissionPermissionRestaurantIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authHasPermissionPermissionRestaurantIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Json$Response(params: AuthHasPermissionPermissionRestaurantIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authHasPermissionPermissionRestaurantIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authHasPermissionPermissionRestaurantIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Json(params: AuthHasPermissionPermissionRestaurantIdGet$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.authHasPermissionPermissionRestaurantIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
