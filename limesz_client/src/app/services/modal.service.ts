import { Injectable, Type } from "@angular/core";
import { ModalProviderComponent } from "../generic/controls/modal-provider/modal-provider.component";
import { ModalOptions } from "../generic/controls/modal/modal-options";

@Injectable()
export class ModalService {
    private modalProvider?: ModalProviderComponent;

    constructor() { }

    setModalProvider(sidebar?: ModalProviderComponent) {
        this.modalProvider = sidebar;
    }

    close() {
        this.modalProvider?.close();
    }

    show<T>(type: Type<unknown>, options?: ModalOptions): T {
        return this.modalProvider?.loadComponent(type, options) as T;
    }
}