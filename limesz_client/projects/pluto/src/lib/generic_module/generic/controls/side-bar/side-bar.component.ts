import { Component, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { DynamicDirective } from '../../dynamic.directive';
import { SidebarService } from '../../../../api-providers/default-services/sidebar-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicDirective, { static: true }) private dynamicHost!: DynamicDirective;

  @Input() width: string = "400px";
  @Input() background: string = "white";
  @Input() color: string = "black";
  @Input() headerBackground: string = "inherit";
  @Input() headerHeight: string = "50px";
  @Input() headerColor: string = "inherit";
  @Input() side: 'left' | 'right' = 'left';
  @Input() position: 'over' | 'nextto' = 'over';

  public isOpen: boolean = false;
  public title: string = '';

  public faXmark = faXmark;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.setSidebar(this, this.side);
  }

  ngOnDestroy(): void {
    this.sidebarService.setSidebar(undefined, this.side);
  }

  loadComponent(type: Type<unknown>): any {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    let ref = viewContainerRef.createComponent(type);
    this.isOpen = true;
    return ref.instance;
  }

  close() {
    this.sidebarService.sidebarIsOpen = false;
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    this.isOpen = false;
  }

}
