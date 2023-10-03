import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './controls/icon-button/icon-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FieldTextComponent } from './controls/field-text/field-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentTextComponent } from './controls/comment-text/comment-text.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoaderComponent } from './controls/loader/loader.component';
import { ModalComponent } from './controls/modal/modal.component';
import { ModalProviderComponent } from './controls/modal-provider/modal-provider.component';
import { FaderComponent } from './controls/fader/fader.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDirective } from './dynamic.directive';
import { SideBarComponent } from './controls/side-bar/side-bar.component';
import { AuthPageLayoutComponent } from './auth-page/auth-page-layout/auth-page-layout.component';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './auth-page/login-page/login-page.component';
import { RegistrationComponent } from './auth-page/registration/registration.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { SafePipe } from './pipes/safe.pipe';
import { MultiLangPipe } from './pipes/multi-lang.pipe';
import { RequestPasswordResetComponent } from './auth-page/request-password-reset/request-password-reset.component';
import { PasswordResetComponent } from './auth-page/password-reset/password-reset.component';
import { SearchBarComponent } from './controls/search-bar/search-bar.component';
import { HasPermissionDirective } from './has-permission.directive';
import { GenericButtonComponent } from './controls/generic-button/generic-button.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatMenuModule } from '@angular/material/menu';
import { AutoSaveIndicatorComponent } from './controls/auto-save-indicator/auto-save-indicator.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { AllergensComponent } from './controls/allergens/allergens.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileSelectorComponent } from './controls/file-selector/file-selector.component';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { LinebreaksPipe } from './pipes/linebreaks.pipe';
import { DatetimePickerComponent } from './controls/datetime-picker/datetime-picker.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TouchButtonComponent } from './controls/touch-button/touch-button.component';
import { LongPressDirective } from './long-press.directive';
import { QrScannerComponent } from './controls/qr-scanner/qr-scanner.component';
import { EmptyComponent } from '../pages/empty/empty.component';
import { MatSelectModule } from '@angular/material/select';
import { QrDataDisplayComponentComponent } from './controls/qr-data-display-component/qr-data-display-component.component';
import { NgxKjuaModule } from 'ngx-kjua';
import { ProgressBarComponent } from './controls/progress-bar/progress-bar.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FoodImgUploadComponent} from "./controls/img-upload/img-upload.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ImageCropperModule} from "ngx-image-cropper";
import {DateRangeSelectorComponent} from "./controls/date-range-selector/date-range-selector.component";



const CommonDeclarations = [
  IconButtonComponent,
  FieldTextComponent,
  FoodImgUploadComponent,
  CommentTextComponent,
  LoaderComponent,
  ModalComponent,
  DateRangeSelectorComponent,
  ModalProviderComponent,
  FaderComponent,
  DynamicDirective,
  SideBarComponent,
  LoginPageComponent,
  AuthPageLayoutComponent,
  RegistrationComponent,
  SafePipe,
  MultiLangPipe,
  RequestPasswordResetComponent,
  PasswordResetComponent,
  SearchBarComponent,
  HasPermissionDirective,
  GenericButtonComponent,
  AutoSaveIndicatorComponent,
  AllergensComponent,
  FileSelectorComponent,
  ColorPickerComponent,
  DatetimePickerComponent,
  TouchButtonComponent,
  LongPressDirective,
  QrScannerComponent,
  DateRangeSelectorComponent,
];

@NgModule({
  declarations: [...CommonDeclarations, LinebreaksPipe, QrDataDisplayComponentComponent, ProgressBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    QuillModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatChipsModule,
    CdkMenuModule,
    MatStepperModule,
    MatTooltipModule,
    MatCheckboxModule,
    NgxMatColorPickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxKjuaModule,
    NgxMatTimepickerModule,
    TranslateModule.forChild({
      extend: true
    }),
    RouterModule.forChild([
      {path: 'empty', component: EmptyComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'password-reset/:token', component: PasswordResetComponent},
      {path: 'request-password-reset', component: RequestPasswordResetComponent},
    ]),
    MatSlideToggleModule,
    MatTabsModule,
    ImageCropperModule
  ],
  exports: [...CommonDeclarations, ProgressBarComponent, DateRangeSelectorComponent],
})
export class GenericModule { }
