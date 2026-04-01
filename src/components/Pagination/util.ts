export function isInteger(value) {
    return (
        // eslint-disable-next-line no-restricted-globals
        typeof value === 'number' && isFinite(value) && Math.floor(value) === value
    );
}

export function defaultItemRender(page, type, element) {
    return element;
}

export function calculatePage(p, { pageSize } = {} as { pageSize: number }, total: number) {
    const page = Math.floor((total - 1) / (typeof p === 'undefined' ? pageSize : p)) + 1;
    return Math.max(1, page);
}

export const isValid = (page: number, current: number, total: number) => {
    return isInteger(page) && page !== current && isInteger(total) && total > 0;
};
