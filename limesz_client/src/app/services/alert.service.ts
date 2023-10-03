import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AlertService {
    public static get instance() {
        return this._instance;
    }
    private static _instance?: AlertService;

    constructor(private toastService: ToastrService, private translateService: TranslateService) {
        AlertService._instance = this;
    }

    async error(message: string, title?: string) {
        let translatedMessage = await firstValueFrom(this.translateService.get(message));
        let translatedTitle = title ? await firstValueFrom(this.translateService.get(title)) : null;
        this.toastService.error(translatedMessage, translatedTitle, { disableTimeOut: true });
    }

    async success(message: string, title?: string) {
        let translatedMessage = await firstValueFrom(this.translateService.get(message));
        let translatedTitle = title ? await firstValueFrom(this.translateService.get(title)) : null;
        this.toastService.success(translatedMessage, translatedTitle, { progressBar: true });
    }

    async warning(message: string, title?: string) {
        let translatedMessage = await firstValueFrom(this.translateService.get(message));
        let translatedTitle = title ? await firstValueFrom(this.translateService.get(title)) : null;
        this.toastService.warning(translatedMessage, translatedTitle);
    }

}