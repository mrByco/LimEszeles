/* tslint:disable */
/* eslint-disable */
import { PasswordResetToken } from '../models/password-reset-token';
import { TokenKey } from '../models/token-key';
import { UserRoles } from '../models/user-roles';
export interface User {
  email?: string | null;
  emailVerifyed?: boolean;
  id?: string | null;
  lastLogin?: string;
  password?: string | null;
  passwordResetToken?: PasswordResetToken;
  passwordSalt?: string | null;
  refreshTokenKeys?: Array<TokenKey> | null;
  registrationDate?: string;
  roles?: UserRoles;
  username?: string | null;
}
