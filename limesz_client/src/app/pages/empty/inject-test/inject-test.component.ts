import { Component, Inject } from '@angular/core';
import { EmptyComponent } from '../empty.component';
import { PlutoForOfContext } from '../../../../../projects/pluto/src/lib/dynamic-ui/directives/pluto-for-of.directive';

@Component({
  selector: 'app-inject-test',
  templateUrl: './inject-test.component.html',
  styleUrls: ['./inject-test.component.scss']
})
export class InjectTestComponent {


  constructor(@Inject(EmptyComponent) private empty: EmptyComponent, @Inject(PlutoForOfContext) private empty2: PlutoForOfContext<string>) {
    console.log(empty);
    console.log(empty2);
  }
}
