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
  get value(): Moment {
    return this._value;
  }

  set value(value: moment.Moment) {
    this._value = value;
    this.onChanged.emit(value.format('YYYY-MM-DDTHH:mm:ss'));
  }

  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<string>();


  private _value: Moment = moment();

  ngAfterViewInit(): void {
    this._value = moment(this.resource[this.prop.jsAccessor]);
  }
}
