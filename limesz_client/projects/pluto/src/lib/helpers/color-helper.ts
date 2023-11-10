import tinycolor from "tinycolor2";

export interface Color {
    name: string;
    hex: string;
    darkContrast: boolean;
}

export function getColorObject(value: any, name: any): Color {
    const c = tinycolor(value);
    return {
        name: name,
        hex: c.toHexString(),
        darkContrast: c.isLight()
    };
}