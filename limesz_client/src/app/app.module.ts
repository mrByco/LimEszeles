import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmptyComponent } from './pages/empty/empty.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { LoginWrapper } from './components/login-wrapper/login-wrapper.component';
import { LobbyComponent } from './menu/components/lobby/lobby.component';
import { GameScreenComponent } from './screens/game-screen/game-screen.component';
import { MyCardsComponent } from './components/my-cards/my-cards.component';
import { CardComponent } from './components/card/card.component';
import { DeckComponent } from './components/deck/deck.component';
import { DecksComponent } from './components/decks/decks.component';
import { InGamePlayerListComponent } from './components/in-game-player-list/in-game-player-list.component';
import { GameRootComponent } from './screens/game-root/game-root.component';
import { ColorPickerPromptComponent } from './components/prompts/color-picker-prompt/color-picker-prompt.component';
import { PromptService } from './services/prompt-service';
import { AuthApi } from './api/services/auth-api';
import { APlutoAuthApi, PlutoModule } from 'projects/pluto/src/public-api';
import { InjectTestComponent } from './pages/empty/inject-test/inject-test.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuModule } from './menu/menu.module';
import { MatMenuModule } from '@angular/material/menu';
import { CardSetService } from './services/card-set-service';


export const ApiUrl = environment.backendUrl;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    LoginWrapper,
    GameScreenComponent,
    MyCardsComponent,
    CardComponent,
    DeckComponent,
    DecksComponent,
    InGamePlayerListComponent,
    ColorPickerPromptComponent,
    GameRootComponent,
    InjectTestComponent,
    NavbarComponent,
  ],
  imports: [
    ImageCropperModule,
    ApiModule.forRoot({ rootUrl: ApiUrl }),
    PlutoModule.forRoot({
      ApiUrl: ApiUrl,
      RefreshTokenPath: AuthApi.AuthRefreshTokenPostPath,
      providers: [
        { provide: APlutoAuthApi, useClass: AuthApi },
      ],
    }),
    MenuModule,
    RouterModule.forRoot([
      { path: 'ingame', component: GameRootComponent, pathMatch: 'full' },
    ], {
      paramsInheritanceStrategy: 'always',
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    MatButtonModule,
    UserService,
    PromptService,
    CardSetService
  ],
  exports: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
