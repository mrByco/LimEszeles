import { Injectable, Type } from "@angular/core";
import { SideBarComponent } from '../../generic_module/generic/controls/side-bar/side-bar.component';


export interface SidebarOpenOptions {
  title?: string,
  background?: string,
  headerBackground?: string,
  headerColor?: string,
  headerHeight?: string,
  position?: 'over' | 'nextto',
  color?: string,
  width?: string,
  side?: 'left' | 'right'
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private get defaultSidebarOptions(): SidebarOpenOptions {
    return {
      title: "",
      background: "white",
      headerBackground: "inherit",
      headerColor: "inherit",
      headerHeight: "50px",
      color: "black",
      width: "400px",
      position: "over",
    }
  }
  public sidebarIsOpen: boolean = false;
  private sidebar_left?: SideBarComponent;
  private sidebar_right?: SideBarComponent;

  constructor() { }

  setSidebar(sidebar?: SideBarComponent, side: 'left' | 'right' = 'left') {
    if (side == 'left')
      this.sidebar_left = sidebar;
    else
      this.sidebar_right = sidebar;

  }

  close() {
    this.sidebarIsOpen = false;
    this.sidebar_left?.close();
    this.sidebar_right?.close();
  }

  show<T>(type: Type<unknown>, openOptions?: SidebarOpenOptions): T {
    this.sidebarIsOpen = false;
    this.close();
    this.sidebarIsOpen = true;
    let options = { ...this.defaultSidebarOptions, ...openOptions ?? {} };

    this.applyOptions(this.sidebar_left, options);
    this.applyOptions(this.sidebar_right, options);

    if (options.side == 'right')
      return this.sidebar_right?.loadComponent(type) as T;
    else
      return this.sidebar_left?.loadComponent(type) as T;
  }

  private applyOptions(sidebar: SideBarComponent | undefined, options: SidebarOpenOptions) {
    if (!sidebar) return;
    sidebar.title = options.title!;
    sidebar.background = options.background!;
    sidebar.headerBackground = options.headerBackground!;
    sidebar.headerColor = options.headerColor!;
    sidebar.headerHeight = options.headerHeight!;
    sidebar.width = options.width!;
    sidebar.color = options.color!;
    sidebar.position = options.position!;
  }


}
