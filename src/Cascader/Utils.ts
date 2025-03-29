import { isNotEmpty } from '../Util';

export const toArray = (val: string | string[] | string[][], separator = '/'): string[] | string[][] => {
    if (isNotEmpty(val)) {
        if (typeof val === 'string') {
            return val.split(separator);
        } else if (val instanceof Array) {
            return val;
        }
    }
    return [];
};
