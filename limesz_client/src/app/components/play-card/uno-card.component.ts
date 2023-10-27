import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uno-card',
  templateUrl: './uno-card.component.html',
  styleUrls: ['./uno-card.component.scss']
})
export class UnoCardComponent {
  @Input() cardContent: string;
  @Input() cardColor: string;
  @Input() textColor: string;
}
