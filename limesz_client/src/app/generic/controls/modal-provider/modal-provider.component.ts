import { AfterViewInit, Component, OnInit, Type, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/generic/controls/modal/modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { DynamicDirective } from '../../dynamic.directive';
import { ModalOptions } from '../modal/modal-options';
import {EmptyComponent} from "../../../pages/empty/empty.component";

@Component({
  selector: 'app-modal-provider',
  templateUrl: './modal-provider.component.html',
  styleUrls: ['./modal-provider.component.scss']
})
export class ModalProviderComponent implements AfterViewInit {
  @ViewChild(DynamicDirective, { static: true }) private dynamicHost!: DynamicDirective;
  @ViewChild(ModalComponent) private modal!: ModalComponent;

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
  }

  public loadComponent<T>(type: Type<unknown>, options?: ModalOptions) {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    let ref = viewContainerRef.createComponent(type);
    this.modal.Show();
    if (options)
      this.modal.options = options;
    return ref.instance;
  }

}

