import {Component, EventEmitter, Input, Output} from '@angular/core';
import moment, {Moment} from "moment";

export interface ValidityDate {
  start: string;
  end: string;
}

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss']
})
export class DateRangeSelectorComponent {
  get startDate(): moment.Moment {
    return moment(this.Range.start);
  }
  set startDate(value: moment.Moment) {
    this.Range.start = value.toISOString();
  }

  get endDate(): moment.Moment {
    return moment(this.Range.end);
  }
  set endDate(value: moment.Moment) {
    this.Range.end = value.toISOString();
  }


  @Input() public Range: ValidityDate = {
    start: (new Date()).toISOString(),
    end: (new Date(Date.now() + 3 * 3600)).toISOString()
  };

}
