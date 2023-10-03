interface discountSize {
    width: number;
    height: number;
}

export const MobileDesignSize: discountSize = { width: 300, height: 400 };
export const DesktopDesignSize: discountSize = { width: 580, height: 286 };

export function DiscountHelpGetDesiredAspectRatio(platform: "mobile" | "desktop"): number {
    let designSize = platform == "mobile" ? MobileDesignSize : DesktopDesignSize;
    return designSize.width / designSize.height;
}

export function DiscountHelpGetHeight(platform: "mobile" | "desktop", width: number): number {
    return width / DiscountHelpGetDesiredAspectRatio(platform);
}

export function DiscountHelpGetPlatform(width: number): "mobile" | "desktop" {
    return width <= 768 ? "mobile" : "desktop";
}