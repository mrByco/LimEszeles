/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface SetCardSetInRide$Params {
  cardSetId: string;
  connectionToken: string;
}

export function setCardSetInRide(http: HttpClient, rootUrl: string, params: SetCardSetInRide$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, setCardSetInRide.PATH, 'get');
  if (params) {
    rb.path('cardSetId', params.cardSetId, {});
    rb.path('connectionToken', params.connectionToken, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

setCardSetInRide.PATH = '/Lobby/set-card-set/{cardSetId}/{connectionToken}';
