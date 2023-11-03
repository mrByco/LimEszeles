import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent {

  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<string>();
}
