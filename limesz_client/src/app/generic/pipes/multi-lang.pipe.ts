
import { ChangeDetectorRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Pipe({
    name: 'multiLang',
    pure: false
})
export class MultiLangPipe implements PipeTransform {
    private translatePipe: TranslatePipe;

    constructor(private langaugeService: LanguageService, injector: Injector) {
        this.translatePipe = new TranslatePipe(injector.get(TranslateService), injector.get(ChangeDetectorRef));
    }

    public transform(value: string | null | undefined): string {
        if (value === null || value === undefined) {
            return '';
        }
        return this.translatePipe.transform(value);
    }
}
