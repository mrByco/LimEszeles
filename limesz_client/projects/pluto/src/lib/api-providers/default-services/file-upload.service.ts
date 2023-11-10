import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { ApiUrl } from '../../pluto.module';

@Injectable()
export class FileUploadService {
  constructor(private http: HttpClient, private loaderService: LoadingService) { }

  public uploadFile(files: FormData, path: string, apploading: boolean = true): Promise<string> {
    if (apploading)
      this.loaderService.loadingOn();
    return new Promise<string>((resolve) => {
      this.http
        .post<string>(ApiUrl + path, files)
        .subscribe({
          next: (response) => {
            if (apploading)
              this.loaderService.loadingOff();
            resolve(response);
          },
          error: (error) => {
            console.log(error);
            if (apploading)
              this.loaderService.loadingOff();
          }
        });
    })
  }



}
