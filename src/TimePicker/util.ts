export const extractDateFormat = (format: string) => {
    return format
        .replace(/\W?m{1,2}|\W?ZZ/g, '')
        .replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '')
        .trim();
};

export const extractTimeFormat = (format: string) => {
    return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, '').trim();
};

export const makeRange = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
};
