/* tslint:disable */
/* eslint-disable */
import { CompanyRoles } from './company-roles';
import { PasswordResetToken } from './password-reset-token';
import { TokenKey } from './token-key';
export interface User {
  appRoles?: null | Array<string>;
  companyRoles?: null | Array<CompanyRoles>;
  email?: null | string;
  emailVerifyed?: boolean;
  id?: null | string;
  lastLogin?: string;
  password?: null | string;
  passwordResetToken?: PasswordResetToken;
  passwordSalt?: null | string;
  refreshTokenKeys?: null | Array<TokenKey>;
  registrationDate?: string;
  username?: null | string;
}
