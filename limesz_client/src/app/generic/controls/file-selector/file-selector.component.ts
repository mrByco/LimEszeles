import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent {
  @Output() onFileSelected: EventEmitter<FileList> = new EventEmitter<FileList>();


  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer == null) return;
    const files = event.dataTransfer.files;
    this.onFileSelected.emit(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileChoosen(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files == null) return;
    this.onFileSelected.emit(files);
  }

}
