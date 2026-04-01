import classNames from 'classnames';
import curry from 'lodash/curry';

export const namespace = 'el';
export const getClassNamePrefix = () => {
    return namespace + '-';
};
export const defaultClassPrefix = (name: string) => `${getClassNamePrefix()}${name}`;

export type ISplitCode = '-' | '__' | '--';

export function prefix(pre: string, className: string | string[], split: ISplitCode = '-'): string {
    if (!pre || !className) {
        return '';
    }

    if (Array.isArray(className)) {
        return classNames(className.filter(name => !!name).map(name => `${pre}-${name}`));
    }

    // if (pre[pre.length - 1] === split) {
    //     return `${pre}${className}`;
    // }

    return `${pre}${split}${className}`;
}

export default curry(prefix);
