/* tslint:disable */
/* eslint-disable */
import { ResourceDescriptionOptions } from './resource-description-options';
import { ResourceProp } from './resource-prop';
export interface ResourceDescription {
  descriptionOptions?: ResourceDescriptionOptions;
  name?: null | string;
  props?: null | Array<ResourceProp>;
  type?: null | string;
}
