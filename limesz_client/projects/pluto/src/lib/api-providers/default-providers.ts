import { EnvironmentProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlAlertService, FileUploadService, LoadingService, ModalService, SidebarService, ThemeService } from '../../public-api';
import { AutosaveService } from './default-services/autosave.service';
import { APlutoAlertService } from './a-pluto-alert-service';
import { APlutoAuthService } from './a-pluto-auth-service';
import { APlutoAuthApi } from './a-pluto-auth-api';
import { APlutoUserApi } from './a-pluto-user-api';
import { PlAuthService } from './default-services/pl-auth.service';
import { AuthApi, UserApi } from './generated-api/services';
import { ApiInterceptorService } from './default-services/api-interceptor.service';


export const defaultProviders: Array<Provider | EnvironmentProviders> = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true,
  },
  // Not overridable services
  SidebarService,
  FileUploadService,
  ModalService,
  ThemeService,
  LoadingService,
  AutosaveService,

  //Replaceable services that pluto uses itself
  { provide: APlutoAlertService, useClass: PlAlertService },
  { provide: APlutoAuthService, useClass: PlAuthService },

  // Build in services for outer use

  //Replaceable APIs
  { provide: APlutoAuthApi, useClass: AuthApi },
  { provide: APlutoUserApi, useClass: UserApi },
];
