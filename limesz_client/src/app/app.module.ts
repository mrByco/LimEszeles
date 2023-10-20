import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmptyComponent } from './pages/empty/empty.component';
import { SidebarService } from './services/sidebar-service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalService } from './services/modal.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileUploadService } from './services/file-upload.service';
import { GenericModule } from './generic/generic.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeService } from './services/theme.service';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './services/alert.service';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { LoadingService } from './services/loading.service';
import { environment } from 'src/environments/environment';
import { AutosaveService } from './services/autosave.service';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { MenuScreenComponent } from './screens/menu-screen/menu-screen.component';
import { MenuBackgroundComponent } from './menu-background/menu-background.component';
import { MenuComponent } from './components/menu/menu.component';
import { BigButtonComponent } from './generic/big-button/big-button.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { LoginWrapper } from './components/login-wrapper/login-wrapper.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbyScreenComponent } from './screens/lobby-screen/lobby-screen.component';
import { GameScreenComponent } from './screens/game-screen/game-screen.component';
import { SelfDeckComponent } from './components/self-deck/self-deck.component';
import { UnoCardComponent } from './components/play-card/uno-card.component';


export const ApiUrl = environment.backendUrl;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    MenuScreenComponent,
    MenuBackgroundComponent,
    MenuComponent,
    BigButtonComponent,
    LoginWrapper,
    LobbyComponent,
    LobbyScreenComponent,
    GameScreenComponent,
    SelfDeckComponent,
    UnoCardComponent,
  ],
  imports: [
    ImageCropperModule,
    GenericModule,
    RouterModule.forRoot([
      { path: '', component: MenuScreenComponent, pathMatch: 'full' },
    ], {
      paramsInheritanceStrategy: 'always',
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: ApiUrl }),
    FormsModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    MatRippleModule,
    MatTabsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true
  },
    AuthService,
    SidebarService,
    FileUploadService,
    MatButtonModule,
    ModalService,
    ThemeService,
    AlertService,
    LoadingService,
    AutosaveService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
