import { Component, Input } from '@angular/core';
import { Deck } from 'src/app/api/models';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent {

  @Input() decks: Deck[] = [];
}
