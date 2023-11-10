import { Component, Input, OnInit } from '@angular/core';
import { ModalOptions } from './modal-options';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../../api-providers/default-services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() public isVisible: boolean = false;

  @Input() public options: ModalOptions = this.defaultOptions;
  faXmark = faXmark

  constructor(private modalService: ModalService) {
  }

  private get defaultOptions(): ModalOptions {
    return {
      title: undefined,
      fullscreen: false,
      defaultColor: "#000",
      backgroundColor: "#FFF"
    }
  }

  public Show = () => {
    this.options = this.defaultOptions;
    return this.isVisible = true;
  };
  public Hide = () => {
    this.options = this.defaultOptions;
    return this.isVisible = false;
  };

  public Close = () => {
    this.modalService.close();
  }

}
