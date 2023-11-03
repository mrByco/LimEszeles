import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';

@Component({
  selector: 'app-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent {
  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<string>();
}
