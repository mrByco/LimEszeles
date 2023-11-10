/* tslint:disable */
/* eslint-disable */
import { ResourceDescriptionOptions } from '../models/resource-description-options';
import { ResourceProp } from '../models/resource-prop';
export interface ResourceDescription {
  descriptionOptions?: ResourceDescriptionOptions;
  name?: string | null;
  props?: Array<ResourceProp> | null;
  type?: string | null;
}
