import { Component, Input } from '@angular/core';
import { ResourceProp } from '../../../api/models/resource-prop';

@Component({
  selector: 'app-dynamic-prop-field',
  templateUrl: './dynamic-prop-field.component.html',
  styleUrls: ['./dynamic-prop-field.component.scss']
})
export class DynamicPropFieldComponent {

  @Input() prop: ResourceProp;
  @Input() resource: any;

}
