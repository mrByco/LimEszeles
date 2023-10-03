
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageString } from 'src/app/api/models';

@Pipe({
    name: 'multiLang',
    pure: false
})
export class MockMultiLangPipe implements PipeTransform {
    public transform(value: string | LanguageString | null | undefined): string | Observable<string> {
        return JSON.stringify(value);
    }
}