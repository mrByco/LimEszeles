/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface PullFromDeck$Params {
  userId: string;
  deckName: string;
  count: number;
}

export function pullFromDeck(http: HttpClient, rootUrl: string, params: PullFromDeck$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, pullFromDeck.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.path('deckName', params.deckName, {});
    rb.path('count', params.count, {});
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

pullFromDeck.PATH = '/Actions/pull/{userId}/{deckName}/{count}';
