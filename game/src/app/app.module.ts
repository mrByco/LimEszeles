import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuBackgroundComponent } from './menu-background/menu-background.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginScreenComponent }, // This route maps '/login' to the LoginScreenComponent
  { path: '**', component: LoginScreenComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    MenuBackgroundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
