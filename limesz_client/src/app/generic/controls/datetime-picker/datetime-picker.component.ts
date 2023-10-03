import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  private _value: Moment = moment();
  @Input() public label: string = "";
  @Input()
  public get value(): Moment {
    return this._value;
  }
  public set value(value: Moment) {
    this._value = value;
    this.dateControl.setValue(value.locale('hu').toDate(), { emitEvent: false });
  }
  @Output() valueChange: EventEmitter<Moment> = new EventEmitter<Moment>();
  @ViewChild('picker', { static: true }) public datePicker: any;

  public dateControl = new FormControl(new Date());


  ngOnInit(): void {
    this.dateControl.valueChanges.pipe().subscribe((value: Date | null) => {
      if (value) {
        this.value = moment(value);
        this.valueChange.emit(this.value);
      }
    });
  }

}
