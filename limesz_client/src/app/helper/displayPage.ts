import { EPageType, LanguageString, SitePage } from "../api/models";


export function GetPageNameByType(type: EPageType) {
    switch (type) {
        case EPageType.$0:
            return "MENU.MENU";
        case EPageType.$1:
            return "MENU.ABOUT_US";
        case EPageType.$2:
            return "MENU.CONTACTS";
        case EPageType.$3:
            return "MENU.INFO";
        case EPageType.$4:
            return "MENU.CHAT";
        case EPageType.$5:
            return "MENU.GALLERY";
    }
}

export function DisplayPage(page: SitePage): string | LanguageString {
    if (page.pageName) return page.pageName;
    return GetPageNameByType(page.type);
}