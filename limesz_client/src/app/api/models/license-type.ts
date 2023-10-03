/* tslint:disable */
/* eslint-disable */
import { Permission } from './permission';
export interface LicenseType {
  galleryLimit: number;
  licenseName: string;
  licensePermissions: Array<Permission>;
}
