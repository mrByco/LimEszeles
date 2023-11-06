import { ResourceDescription } from '../api/models/resource-description';
import { BaseRootModel } from '../api/models/base-root-model';

export function getPropertyByJsPath(object, jsPath) {
  const pathArray = jsPath.split('.').reduce((acc, item) => {
    if (item.includes('[')) {
      const [key, index] = item.split('[');
      const numIndex = parseInt(index.slice(0, -1), 10);
      acc.push(key, numIndex);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  let value = object;
  for (const pathSegment of pathArray) {
    if (value && value.hasOwnProperty(pathSegment)) {
      value = value[pathSegment];
    } else {
      return undefined;
    }
  }

  return value;
}

export function getResourceStringRepresentation(resource: BaseRootModel, resourceDefinition: ResourceDescription) {
  let accessor = resourceDefinition.descriptionOptions.stringRepresentationFieldName;
  return getPropertyByJsPath(resource, accessor);
}
