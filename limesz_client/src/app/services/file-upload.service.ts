import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import {UserService} from "../api/services/user.service";

@Injectable()
export class FileUploadService {
  constructor(private http: HttpClient, private userService: UserService, private loaderService: LoadingService) { }




  public uploadFile(files: FormData, path: string, apploading: boolean = true): Promise<string> {
    if (apploading)
      this.loaderService.loadingOn();
    return new Promise<string>((resolve) => {
      this.http
        .post<string>(this.userService.rootUrl + path, files)
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
