/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  DoCheck,
  EmbeddedViewRef, Host, Inject, inject,
  Injector,
  Input,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable, Optional, SkipSelf,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { ResourceProp } from '../../api-providers/generated-api/models/resource-prop';


export class PlForState {
  public propertyId: string;
  public propertyIndex: number;

  parentState: PlForState | null = null;
  mergedState: { [key: string]: number } = {};
}

export class PlutoForOfContext<T, U extends NgIterable<T> = NgIterable<T>> {
  constructor(public $implicit: T, public ngForOf: U, public index: number, public count: number) {
  }

  get first(): boolean {
    return this.index === 0;
  }

  get last(): boolean {
    return this.index === this.count - 1;
  }

  get even(): boolean {
    return this.index % 2 === 0;
  }

  get odd(): boolean {
    return !this.even;
  }
}

/**
 * A [structural directive](guide/structural-directives) that renders
 * a template for each item in a collection.
 * The directive is placed on an element, which becomes the parent
 * of the cloned templates.
 *
 * The `ngForOf` directive is generally used in the
 * [shorthand form](guide/structural-directives#asterisk) `*ngFor`.
 * In this form, the template to be rendered for each iteration is the content
 * of an anchor element containing the directive.
 *
 * The following example shows the shorthand syntax with some options,
 * contained in an `<li>` element.
 *
 * ```
 * <li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>
 * ```
 *
 * The shorthand form expands into a long form that uses the `ngForOf` selector
 * on an `<ng-template>` element.
 * The content of the `<ng-template>` element is the `<li>` element that held the
 * short-form directive.
 *
 * Here is the expanded version of the short-form example.
 *
 * ```
 * <ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
 *   <li>...</li>
 * </ng-template>
 * ```
 *
 * Angular automatically expands the shorthand syntax as it compiles the template.
 * The context for each embedded view is logically merged to the current component
 * context according to its lexical position.
 *
 * When using the shorthand syntax, Angular allows only [one structural directive
 * on an element](guide/structural-directives#one-per-element).
 * If you want to iterate conditionally, for example,
 * put the `*ngIf` on a container element that wraps the `*ngFor` element.
 * For further discussion, see
 * [Structural Directives](guide/structural-directives#one-per-element).
 *
 * @usageNotes
 *
 * ### Local variables
 *
 * `NgForOf` provides exported values that can be aliased to local variables.
 * For example:
 *
 *  ```
 * <li *ngFor="let user of users; index as i; first as isFirst">
 *    {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
 * </li>
 * ```
 *
 * The following exported values can be aliased to local variables:
 *
 * - `$implicit: T`: The value of the individual items in the iterable (`ngForOf`).
 * - `ngForOf: NgIterable<T>`: The value of the iterable expression. Useful when the expression is
 * more complex then a property access, for example when using the async pipe (`userStreams |
 * async`).
 * - `index: number`: The index of the current item in the iterable.
 * - `count: number`: The length of the iterable.
 * - `first: boolean`: True when the item is the first item in the iterable.
 * - `last: boolean`: True when the item is the last item in the iterable.
 * - `even: boolean`: True when the item has an even index in the iterable.
 * - `odd: boolean`: True when the item has an odd index in the iterable.
 *
 * ### Change propagation
 *
 * When the contents of the iterator changes, `NgForOf` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls that are present, such as `<input>` elements that accept user input. Inserted rows can
 * be animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state
 * such as user input.
 * For more on animations, see [Transitions and Triggers](guide/transition-and-triggers).
 *
 * The identities of elements in the iterator can change while the data does not.
 * This can happen, for example, if the iterator is produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response produces objects with
 * different identities, and Angular must tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted).
 *
 * To avoid this expensive operation, you can customize the default tracking algorithm.
 * by supplying the `trackBy` option to `NgForOf`.
 * `trackBy` takes a function that has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * @see [Structural Directives](guide/structural-directives)
 * @ngModule CommonModule
 * @publicApi
 */
@Directive({
  selector: '[plFor][plForOf]',
})
export class PlutoForOf<T, U extends NgIterable<T> = NgIterable<T>> implements DoCheck {

  @Input()
  set plForOf(plutoForOF: U & NgIterable<T> | undefined | null) {
    this._plForOf = plutoForOF;
    this._plForOfDirty = true;
  }

  @Input()
  set plForTrackBy(fn: TrackByFunction<T>) {
    this._trackByFn = fn;
  }

  get plForTrackBy(): TrackByFunction<T> {
    return this._trackByFn;
  }

  @Input()
  plForProp: ResourceProp | undefined | null = null;


  private _plForOf: U | undefined | null = null;
  private _plForOfDirty: boolean = true;
  private _differ: IterableDiffer<T> | null = null;

  private _trackByFn!: TrackByFunction<T>;

  private _parentForState: PlForState | null = null;

  constructor(
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<PlutoForOfContext<T, U>>, private _differs: IterableDiffers,
    @Host() @Optional() @Inject(PlForState) parentDirective: PlForState) {
    this._parentForState = parentDirective ?? null;
  }

  @Input()
  set ngForTemplate(value: TemplateRef<PlutoForOfContext<T, U>>) {
    if (value) {
      this._template = value;
    }
  }

  ngDoCheck(): void {
    if (this._plForOfDirty) {
      this._plForOfDirty = false;
      // React on ngForOf changes only once all inputs have been initialized
      const value = this._plForOf;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create(this.plForTrackBy);
      }
    }
    if (this._differ) {
      const changes = this._differ.diff(this._plForOf);
      if (changes) this._applyChanges(changes);
    }
  }

  private _applyChanges(changes: IterableChanges<T>) {
    const viewContainer = this._viewContainer;
    changes.forEachOperation(
      (item: IterableChangeRecord<T>, adjustedPreviousIndex: number | null,
       currentIndex: number | null) => {
        if (item.previousIndex == null) {
          // NgForOf is never "null" or "undefined" here because the differ detected
          // that a new item needs to be inserted from the iterable. This implies that
          // there is an iterable value for "_ngForOf".
          let injector = Injector.create([{ provide: PlForState, useValue: this.getForState(this.plForProp?.id ?? "", currentIndex ?? 0) }], this._viewContainer.injector);
          viewContainer.createEmbeddedView(
            this._template, new PlutoForOfContext<T, U>(item.item, this._plForOf!, -1, -1),
            { index: currentIndex === null ? undefined : currentIndex, injector: injector });
        } else if (currentIndex == null) {
          viewContainer.remove(
            adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex);
        } else if (adjustedPreviousIndex !== null) {
          const view = viewContainer.get(adjustedPreviousIndex)!;
          viewContainer.move(view, currentIndex);
          applyViewChange(view as EmbeddedViewRef<PlutoForOfContext<T, U>>, item);
        }
      });

    for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<PlutoForOfContext<T, U>>>viewContainer.get(i);

      const context = viewRef.context;
      context.index = i;
      context.count = ilen;
      context.ngForOf = this._plForOf!;
    }

    changes.forEachIdentityChange((record: any) => {
      const viewRef = <EmbeddedViewRef<PlutoForOfContext<T, U>>>viewContainer.get(record.currentIndex);
      applyViewChange(viewRef, record);
    });
  }

  private getForState(propId: string, i: number): PlForState {
    let forState = new PlForState();
    forState.propertyId = propId;
    forState.propertyIndex = i;
    forState.parentState = this._parentForState;
    forState.mergedState = { ...(this._parentForState?.mergedState??{}), [propId]: i };

    return forState;
  }

  /**
   * Asserts the correct type of the context for the template that `NgForOf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgForOf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T, U extends NgIterable<T>>(dir: PlutoForOf<T, U>, ctx: any):
    ctx is PlutoForOfContext<T, U> {
    return true;
  }
}

// Also export the `NgForOf` class as `NgFor` to improve the DX for
// cases when the directive is used as standalone, so the class name
// matches the CSS selector (*ngFor).
export { PlutoForOf as PlutoFor };

function applyViewChange<T>(
  view: EmbeddedViewRef<PlutoForOfContext<T>>, record: IterableChangeRecord<T>) {
  view.context.$implicit = record.item;
}

function getTypeName(type: any): string {
  return type['name'] || typeof type;
}
