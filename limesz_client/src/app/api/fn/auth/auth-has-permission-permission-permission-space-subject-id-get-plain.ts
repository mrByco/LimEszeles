/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AuthHasPermissionPermissionPermissionSpaceSubjectIdGet$Plain$Params {
  permission: string;
  permissionSpace: string;
  subjectId: string;
}

export function authHasPermissionPermissionPermissionSpaceSubjectIdGet$Plain(http: HttpClient, rootUrl: string, params: AuthHasPermissionPermissionPermissionSpaceSubjectIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, authHasPermissionPermissionPermissionSpaceSubjectIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('permission', params.permission, {});
    rb.path('permissionSpace', params.permissionSpace, {});
    rb.path('subjectId', params.subjectId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

authHasPermissionPermissionPermissionSpaceSubjectIdGet$Plain.PATH = '/Auth/has-permission/{permission}/{permissionSpace}/{subjectId}';
