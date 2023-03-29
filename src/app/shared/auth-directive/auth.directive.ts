import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthGuard } from '../../seguranca/auth.guard';
@Directive({
    selector: '[appHasPermission]'
})
export class AuthDirective {

    constructor(private element: ElementRef, private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef, private authGuard: AuthGuard) { }

    @Input()
    set appHasPermission(val: string) {
        const hasPermission = this.authGuard.hasPermissions(val);

        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
