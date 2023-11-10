import { AfterViewInit, Component, OnInit, Type, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { DynamicDirective } from '../../dynamic.directive';
import { ModalOptions } from '../modal/modal-options';
import { ModalService } from '../../../../api-providers/default-services/modal.service';

@Component({
  selector: 'app-modal-provider',
  templateUrl: './modal-provider.component.html',
  styleUrls: ['./modal-provider.component.scss']
})
export class ModalProviderComponent implements AfterViewInit {
  @ViewChild(DynamicDirective, { static: true }) private dynamicHost!: DynamicDirective;
  @ViewChild(ModalComponent) private modal!: ModalComponent;

  public isOpen = false;

  constructor(private modalService: ModalService) {

  }


  ngAfterViewInit(): void {
    this.modalService.setModalProvider(this);
  }

  ngOnDestroy(): void {
    this.modalService.setModalProvider(undefined);
  }

  public close() {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    this.modal.Hide();
    this.isOpen = false;
  }

  public loadComponent<T>(type: Type<unknown>, options?: ModalOptions) {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    let ref = viewContainerRef.createComponent(type);
    this.modal.Show();
    this.isOpen = true;
    if (options)
      this.modal.options = options;
    return ref.instance;
  }

}

