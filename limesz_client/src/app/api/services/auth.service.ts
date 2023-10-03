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

import { AuthResult } from '../models/auth-result';
import { LoginCredentials } from '../models/login-credentials';
import { PasswordResetDto } from '../models/password-reset-dto';
import { RefreshTokenRequest } from '../models/refresh-token-request';
import { RegistrationData } from '../models/registration-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authLoginPost
   */
  static readonly AuthLoginPostPath = '/Auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Plain$Response(params?: {
    context?: HttpContext
    body?: LoginCredentials
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthLoginPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Plain(params?: {
    context?: HttpContext
    body?: LoginCredentials
  }
): Observable<AuthResult> {

    return this.authLoginPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Json$Response(params?: {
    context?: HttpContext
    body?: LoginCredentials
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthLoginPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Json(params?: {
    context?: HttpContext
    body?: LoginCredentials
  }
): Observable<AuthResult> {

    return this.authLoginPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * Path part for operation authRegisterPost
   */
  static readonly AuthRegisterPostPath = '/Auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRegisterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Plain$Response(params?: {
    context?: HttpContext
    body?: RegistrationData
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthRegisterPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authRegisterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Plain(params?: {
    context?: HttpContext
    body?: RegistrationData
  }
): Observable<AuthResult> {

    return this.authRegisterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRegisterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Json$Response(params?: {
    context?: HttpContext
    body?: RegistrationData
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthRegisterPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authRegisterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRegisterPost$Json(params?: {
    context?: HttpContext
    body?: RegistrationData
  }
): Observable<AuthResult> {

    return this.authRegisterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * Path part for operation authRefreshTokenPost
   */
  static readonly AuthRefreshTokenPostPath = '/Auth/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRefreshTokenPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Plain$Response(params?: {
    context?: HttpContext
    body?: RefreshTokenRequest
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthRefreshTokenPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authRefreshTokenPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Plain(params?: {
    context?: HttpContext
    body?: RefreshTokenRequest
  }
): Observable<AuthResult> {

    return this.authRefreshTokenPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRefreshTokenPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Json$Response(params?: {
    context?: HttpContext
    body?: RefreshTokenRequest
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthRefreshTokenPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authRefreshTokenPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authRefreshTokenPost$Json(params?: {
    context?: HttpContext
    body?: RefreshTokenRequest
  }
): Observable<AuthResult> {

    return this.authRefreshTokenPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * Path part for operation authCreatePasswordResetTokenEmailQueryParamsPost
   */
  static readonly AuthCreatePasswordResetTokenEmailQueryParamsPostPath = '/Auth/create-password-reset-token/{email}/{queryParams}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCreatePasswordResetTokenEmailQueryParamsPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCreatePasswordResetTokenEmailQueryParamsPost$Response(params: {
    email: string;
    queryParams: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthCreatePasswordResetTokenEmailQueryParamsPostPath, 'post');
    if (params) {
      rb.path('email', params.email, {});
      rb.path('queryParams', params.queryParams, {});
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
   * To access the full response (for headers, for example), `authCreatePasswordResetTokenEmailQueryParamsPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCreatePasswordResetTokenEmailQueryParamsPost(params: {
    email: string;
    queryParams: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.authCreatePasswordResetTokenEmailQueryParamsPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authResetPasswordPost
   */
  static readonly AuthResetPasswordPostPath = '/Auth/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResetPasswordPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Plain$Response(params?: {
    context?: HttpContext
    body?: PasswordResetDto
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthResetPasswordPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authResetPasswordPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Plain(params?: {
    context?: HttpContext
    body?: PasswordResetDto
  }
): Observable<AuthResult> {

    return this.authResetPasswordPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResetPasswordPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Json$Response(params?: {
    context?: HttpContext
    body?: PasswordResetDto
  }
): Observable<StrictHttpResponse<AuthResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthResetPasswordPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authResetPasswordPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authResetPasswordPost$Json(params?: {
    context?: HttpContext
    body?: PasswordResetDto
  }
): Observable<AuthResult> {

    return this.authResetPasswordPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<AuthResult>) => r.body as AuthResult)
    );
  }

  /**
   * Path part for operation authProtectedGet
   */
  static readonly AuthProtectedGetPath = '/Auth/protected';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProtectedGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Plain$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthProtectedGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authProtectedGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Plain(params?: {
    context?: HttpContext
  }
): Observable<User> {

    return this.authProtectedGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProtectedGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Json$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthProtectedGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authProtectedGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProtectedGet$Json(params?: {
    context?: HttpContext
  }
): Observable<User> {

    return this.authProtectedGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation authHasPermissionPermissionRestaurantIdGet
   */
  static readonly AuthHasPermissionPermissionRestaurantIdGetPath = '/Auth/has-permission/{permission}/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authHasPermissionPermissionRestaurantIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Plain$Response(params: {
    permission: string;
    restaurantId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthHasPermissionPermissionRestaurantIdGetPath, 'get');
    if (params) {
      rb.path('permission', params.permission, {});
      rb.path('restaurantId', params.restaurantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authHasPermissionPermissionRestaurantIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Plain(params: {
    permission: string;
    restaurantId: string;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.authHasPermissionPermissionRestaurantIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authHasPermissionPermissionRestaurantIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Json$Response(params: {
    permission: string;
    restaurantId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthHasPermissionPermissionRestaurantIdGetPath, 'get');
    if (params) {
      rb.path('permission', params.permission, {});
      rb.path('restaurantId', params.restaurantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authHasPermissionPermissionRestaurantIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authHasPermissionPermissionRestaurantIdGet$Json(params: {
    permission: string;
    restaurantId: string;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.authHasPermissionPermissionRestaurantIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
