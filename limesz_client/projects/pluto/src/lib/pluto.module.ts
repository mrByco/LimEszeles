import { EnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ButtonComponent } from './generic/button/button.component';
import { GenericModule } from './generic_module/generic/generic.module';
import { defaultProviders } from './api-providers/default-providers';

export let ApiUrl = 'API_URL_NOT_SET';
export let RefreshTokenPath = 'REFRESH_TOKEN_PATH_NOT_SET';

interface PlutoModuleOptions {
  ApiUrl: string;
  RefreshTokenPath: string;
  providers?: Array<Provider | EnvironmentProviders>;
}


@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    GenericModule,
  ],
  exports: [
    ButtonComponent,
    GenericModule,

  ],
})
export class PlutoModule {
  static forRoot(options: PlutoModuleOptions): ModuleWithProviders<PlutoModule> {
    ApiUrl = options.ApiUrl;
    RefreshTokenPath = options.RefreshTokenPath;
    let providers = defaultProviders;
    if (options && options.providers) {
      providers = [
        ...providers,
        ...options.providers,
      ];
    }
    return {
      ngModule: PlutoModule,
      providers: [
        ...providers,
      ],
    };
  }
}
