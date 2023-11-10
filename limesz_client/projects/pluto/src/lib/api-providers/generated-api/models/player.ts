/* tslint:disable */
/* eslint-disable */
import { Card } from '../models/card';
export interface Player {
  cards?: Array<Card> | null;
  name?: string | null;
  userId?: string | null;
}
