import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import tinycolor from "tinycolor2";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Color, getColorObject } from "../helper/color-helper";


@Injectable()
export class ThemeService {

    primaryColor = '#094804';
    accentColor = '#ffcc01';
    primaryColorPalette: Color[] = [];
    accentColorPalette: Color[] = [];

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.savePrimaryColor();
        this.saveAccentColor();
    }


    setPrimaryColor(mainColor: string) {
        this.primaryColor = mainColor;
        this.savePrimaryColor();
    }

    savePrimaryColor() {
        this.primaryColorPalette = computeColors(this.primaryColor);
        this.updateTheme(this.primaryColorPalette, 'primary');
    }

    saveAccentColor() {
        this.accentColorPalette = computeColors(this.accentColor);
        this.updateTheme(this.accentColorPalette, 'accent');
    }

    updateTheme(colors: Color[], theme: string) {
        if (isPlatformServer(this.platformId)) {
            console.log("SERVER")
            return;
        }
        colors.forEach(color => {
            document.documentElement.style.setProperty(
                `--theme-${theme}-${color.name}`,
                color.hex
            );
            document.documentElement.style.setProperty(
                `--theme-${theme}-contrast-${color.name}`,
                color.darkContrast ? 'rgba(black, 0.87)' : 'rgba(255, 255, 255, 255)'
            );
        });

        let rippleColor = this.primaryColorPalette[5].darkContrast ? 'black' : 'white';
        document.documentElement.style.setProperty(
            `--ripple-color`, rippleColor
        );
    }

  reset() {
    this.setPrimaryColor('#094804');

  }
}


function computeColors(hex: string): Color[] {
    return [
        getColorObject(tinycolor(hex).lighten(52), '50'),
        getColorObject(tinycolor(hex).lighten(37), '100'),
        getColorObject(tinycolor(hex).lighten(26), '200'),
        getColorObject(tinycolor(hex).lighten(12), '300'),
        getColorObject(tinycolor(hex).lighten(6), '400'),
        getColorObject(tinycolor(hex), '500'),
        getColorObject(tinycolor(hex).darken(6), '600'),
        getColorObject(tinycolor(hex).darken(12), '700'),
        getColorObject(tinycolor(hex).darken(18), '800'),
        getColorObject(tinycolor(hex).darken(24), '900'),
        getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
        getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
        getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
        getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ];
}
