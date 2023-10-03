/* tslint:disable */
/* eslint-disable */
import { LicenseType } from './license-type';
export interface LicenseInfo {
  activatedDate?: string;
  grantedDate?: string;
  id?: null | string;
  licenseType: LicenseType;
  restaurantId: string;
  validUntil?: string;
}
