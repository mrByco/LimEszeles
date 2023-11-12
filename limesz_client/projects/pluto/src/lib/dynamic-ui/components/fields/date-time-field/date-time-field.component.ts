import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Moment } from 'moment';
import moment from 'moment/moment';
import { ResourceProp } from '../../../../api-providers/generated-api/models/resource-prop';

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
  @Input() data: any;
  @Output() onChanged = new EventEmitter<string>();


  private _value: Moment = moment();

  ngAfterViewInit(): void {
    this._value = moment();//moment(this.data[this.prop.jsAccessor]);
  }
}
