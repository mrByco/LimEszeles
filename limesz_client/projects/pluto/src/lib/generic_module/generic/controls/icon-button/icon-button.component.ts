import { Component, Input, OnInit } from '@angular/core';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() icon?: IconProp;
  @Input() size: SizeProp = "lg";
  @Input() color: string = "black";
}
