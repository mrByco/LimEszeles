/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CardSet } from '../models/card-set';
import { getCardSetList$Json } from '../fn/card-set/get-card-set-list-json';
import { GetCardSetList$Json$Params } from '../fn/card-set/get-card-set-list-json';
import { getCardSetList$Plain } from '../fn/card-set/get-card-set-list-plain';
import { GetCardSetList$Plain$Params } from '../fn/card-set/get-card-set-list-plain';

@Injectable({ providedIn: 'root' })
export class CardSetApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCardSetList()` */
  static readonly GetCardSetListPath = '/CardSet/get-card-set-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardSetList$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardSetList$Plain$Response(params?: GetCardSetList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardSet>>> {
    return getCardSetList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardSetList$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardSetList$Plain(params?: GetCardSetList$Plain$Params, context?: HttpContext): Observable<Array<CardSet>> {
    return this.getCardSetList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardSet>>): Array<CardSet> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardSetList$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardSetList$Json$Response(params?: GetCardSetList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardSet>>> {
    return getCardSetList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardSetList$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardSetList$Json(params?: GetCardSetList$Json$Params, context?: HttpContext): Observable<Array<CardSet>> {
    return this.getCardSetList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardSet>>): Array<CardSet> => r.body)
    );
  }

}
