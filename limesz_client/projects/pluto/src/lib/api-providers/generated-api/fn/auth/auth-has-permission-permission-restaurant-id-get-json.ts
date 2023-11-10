/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AuthHasPermissionPermissionRestaurantIdGet$Json$Params {
  permission: string;
  restaurantId: string;
}

export function authHasPermissionPermissionRestaurantIdGet$Json(http: HttpClient, rootUrl: string, params: AuthHasPermissionPermissionRestaurantIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, authHasPermissionPermissionRestaurantIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('permission', params.permission, {});
    rb.path('restaurantId', params.restaurantId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

authHasPermissionPermissionRestaurantIdGet$Json.PATH = '/Auth/has-permission/{permission}/{restaurantId}';
