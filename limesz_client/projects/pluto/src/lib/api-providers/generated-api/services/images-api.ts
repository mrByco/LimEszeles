/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { imagesFullFilenameGet } from '../fn/images/images-full-filename-get';
import { ImagesFullFilenameGet$Params } from '../fn/images/images-full-filename-get';

@Injectable({ providedIn: 'root' })
export class ImagesApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `imagesFullFilenameGet()` */
  static readonly ImagesFullFilenameGetPath = '/Images/{fullFilename}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `imagesFullFilenameGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagesFullFilenameGet$Response(params?: ImagesFullFilenameGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return imagesFullFilenameGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `imagesFullFilenameGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagesFullFilenameGet(params?: ImagesFullFilenameGet$Params, context?: HttpContext): Observable<void> {
    return this.imagesFullFilenameGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
