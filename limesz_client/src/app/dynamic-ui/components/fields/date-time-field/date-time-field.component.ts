import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';
import { Moment } from 'moment';
import moment from 'moment/moment';

@Component({
  selector: 'app-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss']
})
export class DateTimeFieldComponent implements AfterViewInit {

  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<string>();


  value: Moment = moment();

  ngAfterViewInit(): void {
    this.value = moment(this.resource[this.prop.jsAccessor]);
  }
}
