import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[npDragPlaceholderWrapper]'
})
export class DragPlaceholderWrapperDirective<T = any> {

    /** Context data to be added to the preview template instance */
    @Input() data: T;

    constructor(public templateRef: TemplateRef<T>) { }

}
