import { Injectable } from '@angular/core';

@Injectable()
export abstract class APlutoAlertService {
  abstract error(title: string, description?: string);
  abstract success(title: string, description?: string);


  // Only for bypassing DI, when it is used from AuthService, that is used by HttpInterceptor
  // HttpInterceptor > AuthService > Language Service > HTTP_INTERCEPTORS (HttpInterceptor)
  public static get instance() {
    return this._instance;
  }
  private static _instance?: APlutoAlertService;

  constructor() {
    APlutoAlertService._instance = this;
  }
}
