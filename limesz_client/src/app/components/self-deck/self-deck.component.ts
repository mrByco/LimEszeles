import { Component } from '@angular/core';
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

  cards: Card[] = [
    {
      color: 'red',
      displayedValue: '5',
      id: '1',
      value: '5'
    },
    {
      color: 'blue',
      displayedValue: '2',
      id: '2',
      value: '2'
    },
    {
      color: 'green',
      displayedValue: 'skip',
      id: '3',
      value: 'skip'
    },
    {
      color: 'yellow',
      displayedValue: 'reverse',
      id: '4',
      value: 'reverse'
    },
    {
      color: 'red',
      displayedValue: 'draw 2',
      id: '5',
      value: 'draw 2'
    }
  ];


  protected readonly Math = Math;
}
