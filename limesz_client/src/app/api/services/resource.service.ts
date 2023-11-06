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

import { BaseRootModel } from '../models/base-root-model';
import { FieldChange } from '../models/field-change';
import { PaginatedResourceResult } from '../models/paginated-resource-result';
import { ResourceDescription } from '../models/resource-description';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getResourceTypes
   */
  static readonly GetResourceTypesPath = '/Resource/get-resource-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourceTypes$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Plain$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ResourceDescription>>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.GetResourceTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ResourceDescription>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourceTypes$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Plain(params?: {
    context?: HttpContext
  }
): Observable<Array<ResourceDescription>> {

    return this.getResourceTypes$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ResourceDescription>>) => r.body as Array<ResourceDescription>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourceTypes$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Json$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ResourceDescription>>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.GetResourceTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ResourceDescription>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourceTypes$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourceTypes$Json(params?: {
    context?: HttpContext
  }
): Observable<Array<ResourceDescription>> {

    return this.getResourceTypes$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ResourceDescription>>) => r.body as Array<ResourceDescription>)
    );
  }

  /**
   * Path part for operation getResourcesPaginated
   */
  static readonly GetResourcesPaginatedPath = '/Resource/get-resources-paginated/{resourceType}/{page}/{pageSize}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourcesPaginated$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Plain$Response(params: {
    resourceType: string;
    page: number;
    pageSize: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PaginatedResourceResult>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.GetResourcesPaginatedPath, 'get');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('page', params.page, {});
      rb.path('pageSize', params.pageSize, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PaginatedResourceResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourcesPaginated$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Plain(params: {
    resourceType: string;
    page: number;
    pageSize: number;
    context?: HttpContext
  }
): Observable<PaginatedResourceResult> {

    return this.getResourcesPaginated$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PaginatedResourceResult>) => r.body as PaginatedResourceResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResourcesPaginated$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Json$Response(params: {
    resourceType: string;
    page: number;
    pageSize: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PaginatedResourceResult>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.GetResourcesPaginatedPath, 'get');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('page', params.page, {});
      rb.path('pageSize', params.pageSize, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PaginatedResourceResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResourcesPaginated$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResourcesPaginated$Json(params: {
    resourceType: string;
    page: number;
    pageSize: number;
    context?: HttpContext
  }
): Observable<PaginatedResourceResult> {

    return this.getResourcesPaginated$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PaginatedResourceResult>) => r.body as PaginatedResourceResult)
    );
  }

  /**
   * Path part for operation getResource
   */
  static readonly GetResourcePath = '/Resource/get-resource/{resourceType}/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResource$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Plain$Response(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BaseRootModel>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.GetResourcePath, 'get');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseRootModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResource$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Plain(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
  }
): Observable<BaseRootModel> {

    return this.getResource$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseRootModel>) => r.body as BaseRootModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResource$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Json$Response(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BaseRootModel>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.GetResourcePath, 'get');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseRootModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getResource$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Json(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
  }
): Observable<BaseRootModel> {

    return this.getResource$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseRootModel>) => r.body as BaseRootModel)
    );
  }

  /**
   * Path part for operation createResource
   */
  static readonly CreateResourcePath = '/Resource/create-resource/{resourceType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResource$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Plain$Response(params: {
    resourceType: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BaseRootModel>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.CreateResourcePath, 'get');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseRootModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createResource$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Plain(params: {
    resourceType: string;
    context?: HttpContext
  }
): Observable<BaseRootModel> {

    return this.createResource$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseRootModel>) => r.body as BaseRootModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createResource$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Json$Response(params: {
    resourceType: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BaseRootModel>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.CreateResourcePath, 'get');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseRootModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createResource$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createResource$Json(params: {
    resourceType: string;
    context?: HttpContext
  }
): Observable<BaseRootModel> {

    return this.createResource$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseRootModel>) => r.body as BaseRootModel)
    );
  }

  /**
   * Path part for operation updateResource
   */
  static readonly UpdateResourcePath = '/Resource/update-resource/{resourceType}/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResource$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Plain$Response(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
    body?: Array<FieldChange>
  }
): Observable<StrictHttpResponse<BaseRootModel>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.UpdateResourcePath, 'post');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseRootModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateResource$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Plain(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
    body?: Array<FieldChange>
  }
): Observable<BaseRootModel> {

    return this.updateResource$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseRootModel>) => r.body as BaseRootModel)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResource$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Json$Response(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
    body?: Array<FieldChange>
  }
): Observable<StrictHttpResponse<BaseRootModel>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.UpdateResourcePath, 'post');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseRootModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateResource$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResource$Json(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
    body?: Array<FieldChange>
  }
): Observable<BaseRootModel> {

    return this.updateResource$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseRootModel>) => r.body as BaseRootModel)
    );
  }

  /**
   * Path part for operation removeResource
   */
  static readonly RemoveResourcePath = '/Resource/remove-resource/{resourceType}/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeResource$Response(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ResourceService.RemoveResourcePath, 'delete');
    if (params) {
      rb.path('resourceType', params.resourceType, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `removeResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeResource(params: {
    resourceType: string;
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.removeResource$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
