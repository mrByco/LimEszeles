import { Component, Input } from '@angular/core';
import { Card } from '../../api/models/card';

@Component({
  selector: 'app-self-deck',
  templateUrl: './self-deck.component.html',
  styleUrls: ['./self-deck.component.scss']
})
export class SelfDeckComponent {

  /*
  5 random Uno cards

  export interface Card {
  color?: null | string;
  displayedValue?: null | string;
  id?: null | string;
  value?: null | string;
   */

  @Input()
  cards: Card[] = [];


  protected readonly Math = Math;
}
