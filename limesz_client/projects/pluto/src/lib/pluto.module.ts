import { EnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ButtonComponent } from './generic/button/button.component';
import { GenericModule } from './generic_module/generic/generic.module';
import { defaultProviders } from './api-providers/default-providers';
import { DynamicUiModule } from './dynamic-ui/dynamic-ui.module';
import { ApiModule } from './api-providers/generated-api/api.module';

export let ApiUrl = 'API_URL_NOT_SET';
export let RefreshTokenPath = 'REFRESH_TOKEN_PATH_NOT_SET';

// Unfortunately there is no way to set the url for the inner api module, so we use a random path for the api, that will be replaced by the httpInterceptor
export let META_API_REQUEST_PATH = "41e7efe5/3a86/491f/80ec/b431a15cf730"

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
    DynamicUiModule,
    ApiModule.forRoot({ rootUrl: META_API_REQUEST_PATH }),
  ],
  exports: [
    ButtonComponent,
    GenericModule,
    DynamicUiModule,

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
