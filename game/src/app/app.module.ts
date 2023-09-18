import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoginWrapper } from './components/login-wrapper/login-wrapper.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuBackgroundComponent } from './menu-background/menu-background.component';
import {AuthService} from "./services/auth.service";
import {FormsModule} from "@angular/forms";
import { MenuComponent } from './components/menu/menu.component';
import { MenuScreenComponent } from './screens/menu-screen/menu-screen.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LobbyScreenComponent } from './screens/lobby-screen/lobby-screen.component';
import {MatRippleModule} from "@angular/material/core";
import { BigButtonComponent } from './generic/big-button/big-button.component';
import {LobbyService} from "./services/lobby.service";
import { LobbyComponent } from './components/lobby/lobby.component';

const appRoutes: Routes = [
  { path: 'lobby', component: LobbyScreenComponent },
  { path: '**', component: MenuScreenComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginWrapper,
    MenuBackgroundComponent,
    MenuComponent,
    MenuScreenComponent,
    LobbyScreenComponent,
    BigButtonComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatRippleModule
  ],
  providers: [
    AuthService,
    LobbyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
