import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { margareta_green_round } from './margareta_green_round';

@Component({
  selector: 'app-qr-data-display-component',
  templateUrl: './qr-data-display-component.component.html',
  styleUrls: ['./qr-data-display-component.component.scss']
})
export class QrDataDisplayComponentComponent implements AfterViewInit {
  margareta_green_round = margareta_green_round;
  @ViewChild('container') container: ElementRef;

  @Input()
  public data: string = "";

  size: number = 300;


  ngAfterViewInit(): void {
    // Unfortinatelly, we have to avoit the ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.size = Math.min(this.container.nativeElement.clientWidth, this.container.nativeElement.clientHeight) * 0.9;
    })
  }


}
