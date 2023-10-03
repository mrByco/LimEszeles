import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static SelectedLanguage: string = "hu";

  public get currentLanguage(): string {
    return this._currentLanguage;
  }
  public set currentLanguage(v: string) {
    this._currentLanguage = v;
    this.translateService.use(v);
    LanguageService.SelectedLanguage = v;
    localStorage.setItem("selected-language", v)
  }
  private _currentLanguage: string = '';

  constructor(private translateService: TranslateService) {
    this.currentLanguage = localStorage.getItem('selected-language') ?? 'hu';
  }
}
