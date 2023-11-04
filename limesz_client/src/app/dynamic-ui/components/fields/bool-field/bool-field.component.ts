import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceProp } from '../../../../api/models/resource-prop';

@Component({
  selector: 'app-bool-field',
  templateUrl: './bool-field.component.html',
  styleUrls: ['./bool-field.component.scss']
})
export class BoolFieldComponent {
  @Input() prop: ResourceProp;
  @Input() resource: any;
  @Output() onChanged = new EventEmitter<string>();
}
