import { BaseRootModel } from '../api-providers/generated-api/models/base-root-model';
import { ResourceDescription } from '../api-providers/generated-api/models/resource-description';


export function getPropertyByJsPath(object, jsPath) {
  if (!jsPath){
    console.log(new Error('jsPath is undefined').stack);
  }
  const pathArray = [];
  jsPath.split('.').forEach(item => {
    if (item.includes('[')) {
      const items: string[] = item.split('[');
      const key = items.shift();
      let keys = items.map(i => parseInt(i.replace(']', '')));
      pathArray.push(key, ...keys);
    } else {
      pathArray.push(item);
    }
  });

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

export function setPropertyByJsPath(object, jsPath: string, value) {
  const pathArray = [];
  jsPath.split('.').forEach(item => {
    if (item.includes('[')) {
      const items: string[] = item.split('[');
      const key = items.shift();
      let keys = items.map(i => parseInt(i.replace(']', '')));
      pathArray.push(key, ...keys);
    } else {
      pathArray.push(item);
    }
  });

  let currentObject = object;
  for (let i = 0; i < pathArray.length - 1; i++) {

    const pathSegment = pathArray[i];
    if ((currentObject && currentObject.hasOwnProperty(pathSegment)) || !isNaN(parseInt(pathSegment))) {
      currentObject = currentObject[pathSegment];
    } else {
      console.error(`Property ${pathSegment} does not exist in object ${currentObject}, could not be set`)
      return;
    }
  }

  const lastPathSegment = pathArray[pathArray.length - 1];

  currentObject[lastPathSegment] = value;
}

export function getResourceStringRepresentation(resource: BaseRootModel, resourceDefinition: ResourceDescription) {
  let accessor = resourceDefinition.descriptionOptions.stringRepresentationFieldName;
  return getPropertyByJsPath(resource, accessor);
}
