
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ImageCropperComponent, OutputFormat } from 'ngx-image-cropper';
import { dataURLtoFile } from 'src/app/helper/base64-file-converter';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class FoodImgUploadComponent {
  @Output() onImageUploadClicked: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() onUploaded: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() onFileInputChanged: EventEmitter<void> = new EventEmitter<void>();


  public originalFileName: string = 'filename';

  @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;

  isCropping: boolean = false;
  imageSourceFile: File | undefined;
  cropImgPreviewBase64!: any;
  cropImgFile!: any;
  imgTargetRatio: number = 4 / 3;
  maintainAspectRatio: boolean = true;
  imgTargetWidth: number = 1080;
  format: OutputFormat = 'jpeg';
  uploadTask: (() => Promise<void>) | undefined;
  uploadUrl: string | undefined;

  constructor(private modalService: ModalService, private fileUploadService: FileUploadService) {

  }

  onFileChanged(files: FileList) {
    if (files.length == 0) return;
    const file = files.item(0);
    if (file == null) return;
    this.setInputFile(file);
  }

  private setInputFile(file: File) {
    this.isCropping = true;
    this.originalFileName = file.name;
    this.imageSourceFile = file;
    this.onFileInputChanged.emit();
  }

  cropImg(event: any) {
    this.cropImgPreviewBase64 = event.base64;
    this.cropImgFile = dataURLtoFile(this.cropImgPreviewBase64, 'upload');
  }

  doUpload = async () => {
    this.fireOnImageUploadClickedEvent();
    if (this.uploadTask) {
      await this.uploadTask();
      this.onUploaded.emit();
      this.modalService.close();
      return;
    }
    if (this.uploadUrl) {
      let data = new FormData();
      data.append('upload', this.cropImgFile);
      await this.fileUploadService.uploadFile(data, this.uploadUrl);
      this.onUploaded.emit();
      this.modalService.close();
      return;
    }
    this.modalService.close();
  }

  private fireOnImageUploadClickedEvent() {
    let data = new FormData();
    data.append('upload', this.cropImgFile);
    this.onImageUploadClicked.emit(data);
  }

  imgFailed() {
    alert("Hiba a kép felismerésében!");
  }

  toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });


  async loadFile(url: string) {
    let file: File = await this.openFileFromUrl(url);
    this.setInputFile(file);
  }

  openFileFromUrl = async (url: string) => {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);
    return file;
  };
}
