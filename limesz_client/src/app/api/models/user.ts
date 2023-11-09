/* tslint:disable */
/* eslint-disable */
import { PasswordResetToken } from './password-reset-token';
import { TokenKey } from './token-key';
import { UserRoles } from './user-roles';
export interface User {
  email?: null | string;
  emailVerifyed?: boolean;
  id?: null | string;
  lastLogin?: string;
  password?: null | string;
  passwordResetToken?: PasswordResetToken;
  passwordSalt?: null | string;
  refreshTokenKeys?: null | Array<TokenKey>;
  registrationDate?: string;
  roles?: UserRoles;
  username?: null | string;
}
