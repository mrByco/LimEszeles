/* tslint:disable */
/* eslint-disable */
import { Permission } from '../models/permission';
export interface LicenseType {
  galleryLimit: number;
  licenseName: string;
  licensePermissions: Array<Permission>;
}
