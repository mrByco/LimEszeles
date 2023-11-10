/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { WeatherForecast } from '../models/weather-forecast';
import { weatherForecastGet$Json } from '../fn/weather-forecast/weather-forecast-get-json';
import { WeatherForecastGet$Json$Params } from '../fn/weather-forecast/weather-forecast-get-json';
import { weatherForecastGet$Plain } from '../fn/weather-forecast/weather-forecast-get-plain';
import { WeatherForecastGet$Plain$Params } from '../fn/weather-forecast/weather-forecast-get-plain';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApi extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `weatherForecastGet()` */
  static readonly WeatherForecastGetPath = '/WeatherForecast';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherForecastGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherForecastGet$Plain$Response(params?: WeatherForecastGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeatherForecast>>> {
    return weatherForecastGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `weatherForecastGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherForecastGet$Plain(params?: WeatherForecastGet$Plain$Params, context?: HttpContext): Observable<Array<WeatherForecast>> {
    return this.weatherForecastGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeatherForecast>>): Array<WeatherForecast> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `weatherForecastGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherForecastGet$Json$Response(params?: WeatherForecastGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WeatherForecast>>> {
    return weatherForecastGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `weatherForecastGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  weatherForecastGet$Json(params?: WeatherForecastGet$Json$Params, context?: HttpContext): Observable<Array<WeatherForecast>> {
    return this.weatherForecastGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WeatherForecast>>): Array<WeatherForecast> => r.body)
    );
  }

}
