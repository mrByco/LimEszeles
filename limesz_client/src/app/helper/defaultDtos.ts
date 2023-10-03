import ShortUniqueId from "short-unique-id";
import { LicenseType} from "../api/models";

export function GetDefaultTrialLicense(): LicenseType {
    return {
        licenseName: 'TRIAL',
        galleryLimit: 10,
        licensePermissions: [
            2, 3, 4, 6, 7, 8, 9
        ]
    }
}
