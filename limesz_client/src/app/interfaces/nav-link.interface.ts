import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { LanguageString } from "../api/models";

export interface Navlink {
    name: string | LanguageString,
    route: string,
    icon: IconProp,
    onClick?: () => void
}