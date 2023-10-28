import { Component, Input } from '@angular/core';
import { Card } from '../../api/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
  @Input() flipped: boolean;
}
