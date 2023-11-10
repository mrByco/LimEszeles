import { Component, inject } from '@angular/core';
import { ResourceTypeService } from '../../services/resource-type-service';

@Component({
  selector: 'app-resource-menu',
  templateUrl: './resource-menu.component.html',
  styleUrls: ['./resource-menu.component.scss']
})
export class ResourceMenuComponent {
  public resourceTypeService = inject(ResourceTypeService);

  public randomDelays = [];
  public randomDelay(i: number): string {
    if (!this.randomDelays[i]) {
      this.randomDelays[i] = Math.random() * 300;
    }
    return this.randomDelays[i] + 'ms';
  }

}
