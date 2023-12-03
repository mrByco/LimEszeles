import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinScreenComponent } from './pages/join-screen/join-screen.component';
import { LobbyScreenComponent } from './pages/lobby-screen/lobby-screen.component';
import { FormsModule } from '@angular/forms';
import { GenericModule } from 'pluto/src/lib/generic_module/generic/generic.module';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AppModule } from '../app.module';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    JoinScreenComponent,
    LobbyScreenComponent,
    WelcomeComponent,
    LobbyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GenericModule,
    MatTabsModule,
    RouterModule.forChild([
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'join', component: JoinScreenComponent },
      { path: 'lobby', component: LobbyScreenComponent },
    ]),
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
  ],

  exports: [
    WelcomeComponent,
  ],
})
export class MenuModule { }
