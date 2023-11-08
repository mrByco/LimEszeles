import { NgModule } from '@angular/core';
import { PlutoComponent } from './pluto.component';
import { ButtonComponent } from './generic/button/button.component';



@NgModule({
  declarations: [
    PlutoComponent,
    ButtonComponent
  ],
  imports: [
  ],
  exports: [
    PlutoComponent,
    ButtonComponent
  ]
})
export class PlutoModule { }
