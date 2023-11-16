import { EnvironmentProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlAlertService, FileUploadService, LoadingService, ModalService, SidebarService, ThemeService } from '../../public-api';
import { AutosaveService } from './default-services/autosave.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth-service';
import { APlutoAuthApi } from './a-pluto-auth-api';
import { APlutoUserApi } from './a-pluto-user-api';
import { PlAuthService } from './default-services/pl-auth.service';
import { AuthApi, UserApi } from './generated-api/services';
import { ApiInterceptorService } from './default-services/api-interceptor.service';
import { DataContextProvider } from './data-context-provider';
import { PlDataContextProvider } from './default-services/pl-data-context-provider';
import { PlUserService } from './default-services/pl-user.service';
import { UserService } from './user-service';


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
  { provide: AlertService, useClass: PlAlertService },
  { provide: AuthService, useClass: PlAuthService },
  { provide: DataContextProvider, useClass: PlDataContextProvider },
  { provide: UserService, useClass: PlUserService },

  // Build in services for outer use

  //Replaceable APIs
  { provide: APlutoAuthApi, useClass: AuthApi },
  { provide: APlutoUserApi, useClass: UserApi },
];
