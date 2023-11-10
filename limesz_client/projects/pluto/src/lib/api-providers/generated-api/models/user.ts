/* tslint:disable */
/* eslint-disable */
import { CompanyRoles } from '../models/company-roles';
import { PasswordResetToken } from '../models/password-reset-token';
import { TokenKey } from '../models/token-key';
export interface User {
  appRoles?: Array<string> | null;
  companyRoles?: Array<CompanyRoles> | null;
  email?: string | null;
  emailVerifyed?: boolean;
  id?: string | null;
  lastLogin?: string;
  password?: string | null;
  passwordResetToken?: PasswordResetToken;
  passwordSalt?: string | null;
  refreshTokenKeys?: Array<TokenKey> | null;
  registrationDate?: string;
  username?: string | null;
}
