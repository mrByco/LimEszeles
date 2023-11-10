import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { firstValueFrom } from "rxjs";
import { APlutoAlertService } from '../a-pluto-alert-service';

@Injectable()
export class PlAlertService extends APlutoAlertService {
    constructor(private toastService: ToastrService, private translateService: TranslateService) {
        super();
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
