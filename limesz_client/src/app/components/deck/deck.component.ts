import { Component, Input } from '@angular/core';
import { Deck } from 'src/app/api/models';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() deck: Deck;
}
