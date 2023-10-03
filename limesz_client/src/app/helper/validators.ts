
export function LenghtValidator(minChars: number, maxChars: number): (value: string) => string[] {
    return (value: string) => {
        if (value.length < minChars) return ["Too short!"];
        if (value.length > maxChars) return ["Too long!"];
        return [];
    }
}
export function EmailValidator(): (value: string) => string[] {
    return (value: string) => {
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(value) ? [] : ["Please give a valid email address!"];
    }
}
export function PhoneNumberValidator(): (value: string) => string[] {
    return (value: string) => {
        let regexp = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        return regexp.test(value) ? [] : ["Please give a valid phone number!"];
    }
}
export function ZipCodeValidator(): (value: string) => string[] {
    return (value: string) => {
        let regexp = new RegExp(/^\d{4}$/);
        return regexp.test(value) ? [] : ["Please give a valid zip code!"];
    }
}
export function PasswordValidator(): (value: string) => string[] {
    return (value: string) => {
        let error = [];

        if (value.length < 8) error.push("Too short!");


        let regexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/);
        if (!regexp.test(value)) error.push("Password must contain, uppercase, lowercase character, and a number");
        return error;
    }
}