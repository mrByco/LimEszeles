/* tslint:disable */
/* eslint-disable */
import { PasswordResetToken } from '../models/password-reset-token';
import { RolesItem } from '../models/roles-item';
import { TokenKey } from '../models/token-key';
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
  roles?: Array<RolesItem> | null;
  username?: string | null;
}
