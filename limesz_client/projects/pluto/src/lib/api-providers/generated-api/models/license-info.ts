/* tslint:disable */
/* eslint-disable */
import { LicenseType } from '../models/license-type';
export interface LicenseInfo {
  activatedDate?: string;
  grantedDate?: string;
  id?: string | null;
  licenseType: LicenseType;
  restaurantId: string;
  validUntil?: string;
}
