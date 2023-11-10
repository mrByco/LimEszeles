import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PlAuthService } from '../../api-providers/default-services/pl-auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private hasView = false;

  private _permission: string | undefined;
  public get permission(): string | undefined {
    return this._permission;
  }
  public set permission(value: string | undefined) {
    this._permission = value;
    this.updateVisible();
  }

  @Input() set appHasPermission(permission: string | undefined) {
    this.permission = permission;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: PlAuthService) {
    authService.Authenticated$.subscribe(x => this.updateVisible());
  }

  public updateVisible() {
    let shouldShow = false;

    if (!this.permission) shouldShow = this.authService.Authenticated$.value;
    if (this.permission) {
      if (this.authService.Authenticated$.value) {
        this.authService.checkPermission(this.permission, undefined).then(x => {
          shouldShow = x;
          this.updateUI(shouldShow);
        });
      }
    }

    this.updateUI(shouldShow);
  }


  private updateUI(shouldShow: boolean) {
    if (!this.hasView && shouldShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView && !shouldShow) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
