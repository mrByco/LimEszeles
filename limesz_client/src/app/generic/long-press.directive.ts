
import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from "@angular/core";
import { stat } from "fs";
import {
  fromEvent,
  merge,
  of,
  Subscription,
  timer
} from "rxjs";
import {
  filter,
  map,
  switchMap
} from "rxjs/operators";

@Directive({
  selector: "[longPress]"
})
export class LongPressDirective implements OnDestroy {
  private eventSubscribe: Subscription;
  threshold = 1500;

  @Output()
  mouseLongPress = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    let eventSent = false;
    const mousedown = fromEvent<MouseEvent>(elementRef.nativeElement, "mousedown").pipe(
      filter(event => event.button == 0),  // Only allow left button (Primary button)
      map((event) => true) // turn on threshold counter
    );
    const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(map(() => true));
    const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(map(() => {
      eventSent = false;
      return false;
    }));
    const mouseup = fromEvent<MouseEvent>(window, "mouseup").pipe(
      filter(event => event.button == 0),  // Only allow left button (Primary button)
      map(() => {
        eventSent = false;
        return false;
      }) // reset threshold counter
    );
    this.eventSubscribe = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        switchMap(state =>
          state ? timer(this.threshold, 100) : of(null)
        ),
        filter((value: any) => value)
      )
      .subscribe((state: any) => {
        if (eventSent) return;
        eventSent = true;
        console.log(state);
        this.mouseLongPress.emit()
        console.log
      });
  }

  ngOnDestroy(): void {
    if (this.eventSubscribe) {
      this.eventSubscribe.unsubscribe();
    }
  }
}