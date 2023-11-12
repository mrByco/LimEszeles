import { Component, EventEmitter, inject, Input, Optional, Output } from '@angular/core';
import { BaseField } from '../base-field';
import { PlForState } from '../../../directives/pluto-for-of.directive';

@Component({
  selector: 'app-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent extends BaseField {

  @Input() set prop(value) {
    this.baseProp = value;
  }
}
