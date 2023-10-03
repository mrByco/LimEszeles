import { inject, InjectionToken } from "@angular/core";
import { UrlMatchResult, UrlSegment } from "@angular/router";

const reservedDomains = ['margareta.app', 'dev.margareta.app', 'api.margareta.app', 'margareta-app-staging.azurewebsites.net']

export function restaurantSubdomainMatcher(originalUrl: UrlSegment[]): UrlMatchResult | null {
    let originSegments = origin.replace('https://', '').replace('http://', '').split('/')[0].split(".").reverse().reduce((prev: string[], current) => [...current.split('--'), ...prev], []);
    let url = originalUrl.map(u => u);

    let customMatched = false;

    useSubdomainIfPossible();
    useCustomDomainIfPossible();

    let consumed = customMatched ? [] : [url[0]];

    if (url.length > 0) {
        return { consumed: consumed, posParams: { 'restaurantUrl': url[0] } }
    }
    return null;

    function useSubdomainIfPossible() {
        if (originSegments.length == 3
            && domainIsNotReserved()
            && originSegments[2] == 'app' && originSegments[1] == 'margareta') {
            removeRestaurantUrlIfPresentInPath();
            url = [new UrlSegment(originSegments[0], {}), ...url];
            customMatched = true;
        };
    }

    function useCustomDomainIfPossible() {
        if (originSegments.length == 2 && domainIsNotReserved()) {
            removeRestaurantUrlIfPresentInPath();
            url = [new UrlSegment(originSegments[0] + '.' + originSegments[1], {}), ...url];
            customMatched = true;
        };
    }

    function removeRestaurantUrlIfPresentInPath() {
        if (url[0]?.toString() == originSegments[0]) {
            originalUrl.shift();
        }
    }

    function domainIsNotReserved() {
        return reservedDomains.map((s) => s.split('.')).find((s) => sameStringArrays(s, originSegments)) == undefined
    }
}

function sameStringArrays(a: any, b: any) {
    if (a.length != b.length) {
        return false;
    }

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}