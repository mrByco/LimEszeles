/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BaseRootModel } from '../models/base-root-model';
import { createResource$Json } from '../fn/resource/create-resource-json';
import { CreateResource$Json$Params } from '../fn/resource/create-resource-json';
import { createResource$Plain } from '../fn/resource/create-resource-plain';
import { CreateResource$Plain$Params } from '../fn/resource/create-resource-plain';
import { getResource$Json } from '../fn/resource/get-resource-json';
import { GetResource$Json$Params } from '../fn/resource/get-resource-json';
import { getResource$Plain } from '../fn/resource/get-resource-plain';
import { GetResource$Plain$Params } from '../fn/resource/get-resource-plain';
import { getResourcesPaginated$Json } from '../fn/resource/get-resources-paginated-json';
import { GetResourcesPaginated$Json$Params } from '../fn/resource/get-resources-paginated-json';
import { getResourcesPaginated$Plain } from '../fn/resource/get-resources-paginated-plain';
import { GetResourcesPaginated$Plain$Params } from '../fn/resource/get-resources-paginated-plain';
import { getResourceTypes$Json } from '../fn/resource/get-resource-types-json';
import { GetResourceTypes$Json$Params } from '../fn/resource/get-resource-types-json';
import { getResourceTypes$Plain } from '../fn/resource/get-resource-types-plain';
import { GetResourceTypes$Plain$Params } from '../fn/resource/get-resource-types-plain';
import { PaginatedResourceResult } from '../models/paginated-resource-result';
import { removeResource } from '../fn/resource/remove-resource';
import { RemoveResource$Params } from '../fn/resource/remove-resource';
import { ResourceDescription } from '../models/resource-description';
import { updateResource$Json } from '../fn/resource/update-resource-json';
import { UpdateResource$Json$Params } from '../fn/resource/update-resource-json';
import { updateResource$Plain } from '../fn/resource/update-resource-plain';
import { UpdateResource$Plain$Params } from '../fn/resource/update-resource-plain';

@Injectable({ providedIn: 'root' })
export class ResourceApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getResourceTypes()` */
  static readonly GetResourceTypesPath = '/Resource/get-resource-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourceTypes$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Plain$Response(params?: GetResourceTypes$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ResourceDescription>>> {
    return getResourceTypes$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResourceTypes$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Plain(params?: GetResourceTypes$Plain$Params, context?: HttpContext): Observable<Array<ResourceDescription>> {
    return this.getResourceTypes$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ResourceDescription>>): Array<ResourceDescription> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourceTypes$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Json$Response(params?: GetResourceTypes$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ResourceDescription>>> {
    return getResourceTypes$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResourceTypes$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Json(params?: GetResourceTypes$Json$Params, context?: HttpContext): Observable<Array<ResourceDescription>> {
    return this.getResourceTypes$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ResourceDescription>>): Array<ResourceDescription> => r.body)
    );
  }

  /** Path part for operation `getResourcesPaginated()` */
  static readonly GetResourcesPaginatedPath = '/Resource/get-resources-paginated/{resourceType}/{page}/{pageSize}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourcesPaginated$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Plain$Response(params: GetResourcesPaginated$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedResourceResult>> {
    return getResourcesPaginated$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResourcesPaginated$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Plain(params: GetResourcesPaginated$Plain$Params, context?: HttpContext): Observable<PaginatedResourceResult> {
    return this.getResourcesPaginated$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedResourceResult>): PaginatedResourceResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourcesPaginated$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Json$Response(params: GetResourcesPaginated$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedResourceResult>> {
    return getResourcesPaginated$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResourcesPaginated$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Json(params: GetResourcesPaginated$Json$Params, context?: HttpContext): Observable<PaginatedResourceResult> {
    return this.getResourcesPaginated$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedResourceResult>): PaginatedResourceResult => r.body)
    );
  }

  /** Path part for operation `getResource()` */
  static readonly GetResourcePath = '/Resource/get-resource/{resourceType}/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResource$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Plain$Response(params: GetResource$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
    return getResource$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResource$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Plain(params: GetResource$Plain$Params, context?: HttpContext): Observable<BaseRootModel> {
    return this.getResource$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseRootModel>): BaseRootModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResource$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Json$Response(params: GetResource$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
    return getResource$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResource$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Json(params: GetResource$Json$Params, context?: HttpContext): Observable<BaseRootModel> {
    return this.getResource$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseRootModel>): BaseRootModel => r.body)
    );
  }

  /** Path part for operation `createResource()` */
  static readonly CreateResourcePath = '/Resource/create-resource/{resourceType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResource$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Plain$Response(params: CreateResource$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
    return createResource$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createResource$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Plain(params: CreateResource$Plain$Params, context?: HttpContext): Observable<BaseRootModel> {
    return this.createResource$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseRootModel>): BaseRootModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResource$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Json$Response(params: CreateResource$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
    return createResource$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createResource$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Json(params: CreateResource$Json$Params, context?: HttpContext): Observable<BaseRootModel> {
    return this.createResource$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseRootModel>): BaseRootModel => r.body)
    );
  }

  /** Path part for operation `updateResource()` */
  static readonly UpdateResourcePath = '/Resource/update-resource/{resourceType}/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResource$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Plain$Response(params: UpdateResource$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
    return updateResource$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateResource$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Plain(params: UpdateResource$Plain$Params, context?: HttpContext): Observable<BaseRootModel> {
    return this.updateResource$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseRootModel>): BaseRootModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResource$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Json$Response(params: UpdateResource$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<BaseRootModel>> {
    return updateResource$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateResource$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Json(params: UpdateResource$Json$Params, context?: HttpContext): Observable<BaseRootModel> {
    return this.updateResource$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseRootModel>): BaseRootModel => r.body)
    );
  }

  /** Path part for operation `removeResource()` */
  static readonly RemoveResourcePath = '/Resource/remove-resource/{resourceType}/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeResource$Response(params: RemoveResource$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeResource(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeResource(params: RemoveResource$Params, context?: HttpContext): Observable<void> {
    return this.removeResource$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
