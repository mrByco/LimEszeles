import { environment } from "src/environments/environment";

export function getImageUrl(imageName: string, thumbType: '' | "150" | "300" | '800' = '') {
    let nameSegments = imageName.split('.');
    let extension = nameSegments[nameSegments.length - 1];
    imageName = imageName.replace('.' + extension, (thumbType == '' ? '' : '_') + thumbType + '.' + extension);
    return environment.backendUrl + '/images/' + imageName;
}