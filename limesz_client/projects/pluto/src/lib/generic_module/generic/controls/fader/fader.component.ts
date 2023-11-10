import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fader',
  templateUrl: './fader.component.html',
  styleUrls: ['./fader.component.scss']
})
export class FaderComponent implements OnInit {
  @Input() public isVisible !: boolean;
  constructor () { }

  ngOnInit(): void {
  }

}
