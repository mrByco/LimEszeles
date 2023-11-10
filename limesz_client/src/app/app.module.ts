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
import { MenuScreenComponent } from './screens/menu-screen/menu-screen.component';
import { MenuBackgroundComponent } from './menu-background/menu-background.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { LoginWrapper } from './components/login-wrapper/login-wrapper.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbyScreenComponent } from './screens/lobby-screen/lobby-screen.component';
import { GameScreenComponent } from './screens/game-screen/game-screen.component';
import { MyCardsComponent } from './components/my-cards/my-cards.component';
import { CardComponent } from './components/card/card.component';
import { DeckComponent } from './components/deck/deck.component';
import { DecksComponent } from './components/decks/decks.component';
import { InGamePlayerListComponent } from './components/in-game-player-list/in-game-player-list.component';
import { GameRootComponent } from './screens/game-root/game-root.component';
import { ColorPickerPromptComponent } from './components/prompts/color-picker-prompt/color-picker-prompt.component';
import { PromptService } from './services/prompt-service';
import { InjectTestComponent } from './pages/empty/inject-test/inject-test.component';
import { AuthApi } from './api/services';
import { PlutoModule } from '../../projects/pluto/src/lib/pluto.module';
import { APlutoAuthApi } from '../../projects/pluto/src/lib/api-providers/a-pluto-auth-api';


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
    LoginWrapper,
    LobbyComponent,
    LobbyScreenComponent,
    GameScreenComponent,
    MyCardsComponent,
    CardComponent,
    DeckComponent,
    DecksComponent,
    InGamePlayerListComponent,
    ColorPickerPromptComponent,
    InGamePlayerListComponent,
    GameRootComponent,
    InjectTestComponent
  ],
  imports: [
    ImageCropperModule,
    PlutoModule.forRoot({
      ApiUrl: ApiUrl,
      RefreshTokenPath: AuthApi.AuthRefreshTokenPostPath,
      providers: [
          { provide: APlutoAuthApi, useClass: AuthApi, deps: [ApiModule] },
        ]
    }),
    RouterModule.forRoot([
      { path: '', component: GameRootComponent, pathMatch: 'full' },
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
  providers: [
    MatButtonModule,
    UserService,
    PromptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
