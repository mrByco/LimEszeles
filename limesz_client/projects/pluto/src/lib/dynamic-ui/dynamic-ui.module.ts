import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceMenuComponent } from './components/resource-menu/resource-menu.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { RouterModule } from '@angular/router';
import { ResourceTypeService } from './services/resource-type-service';
import { ResourceService } from './services/resource-service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { MatSortModule } from '@angular/material/sort';
import { DynamicPropFieldComponent } from './components/dynamic-prop-field/dynamic-prop-field.component';
import { StringFieldComponent } from './components/fields/string-field/string-field.component';
import { NumberFieldComponent } from './components/fields/number-field/number-field.component';
import { DateTimeFieldComponent } from './components/fields/date-time-field/date-time-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatetimePickerComponent } from './components/fields/date-time-field/datetime-picker/datetime-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoolFieldComponent } from './components/fields/bool-field/bool-field.component';
import { _MatCheckboxRequiredValidatorModule, MatCheckboxModule } from '@angular/material/checkbox';
import { GenericModule } from '../generic_module/generic/generic.module';
import { ListFieldComponent } from './components/list/list-field/list-field.component';
import { MatListModule } from '@angular/material/list';
import { ObjectFieldComponent } from './components/fields/object-field/object-field.component';
import { MatButtonModule } from '@angular/material/button';
import { ReferenceFieldComponent } from './components/fields/reference-field/reference-field.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlResource } from './directives/pl-resource.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlutoForOf } from './directives/pluto-for-of.directive';
import { ContextTypesComponent } from './components/context-types/context-types.component';



@NgModule({
  declarations: [
    ResourceMenuComponent,
    ResourceListComponent,
    ResourceDetailsComponent,
    GenericTableComponent,
    DynamicPropFieldComponent,
    StringFieldComponent,
    NumberFieldComponent,
    DateTimeFieldComponent,
    DatetimePickerComponent,
    BoolFieldComponent,
    ListFieldComponent,
    ObjectFieldComponent,
    ReferenceFieldComponent,
    PlResource,
    PlutoForOf,
    ContextTypesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'resources',
        component: ResourceMenuComponent,
      },
      {
        path: 'resources/:resourceName',
        component: ResourceListComponent,
      },
      {
        path: 'resources/:resourceName/:id',
        component: ResourceDetailsComponent,
      },
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    _MatCheckboxRequiredValidatorModule,
    FormsModule,
    MatCheckboxModule,
    GenericModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTooltipModule,
  ],
  providers: [
    ResourceTypeService,
    ResourceService,
  ]
})
export class DynamicUiModule { }
