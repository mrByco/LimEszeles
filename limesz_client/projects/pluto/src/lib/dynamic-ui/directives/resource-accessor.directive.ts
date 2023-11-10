import { Directive, Host, inject, Input, Optional, SkipSelf } from '@angular/core';

@Directive({
  selector: '[appResourceAccessor]'
})
export class ResourceAccessorDirective {

  @Input() appResourceAccessor: string = "blue"

  parents: ResourceAccessorDirective[];

  constructor(@SkipSelf() @Optional() parent: ResourceAccessorDirective) {
    this.parents = parent ? parent.parents.concat([parent]) : [];
  }

}
