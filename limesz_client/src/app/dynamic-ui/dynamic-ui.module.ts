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
import { ReactiveFormsModule } from '@angular/forms';



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
    DatetimePickerComponent
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
    MatIconModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    ResourceTypeService, ResourceService
  ]
})
export class DynamicUiModule { }
