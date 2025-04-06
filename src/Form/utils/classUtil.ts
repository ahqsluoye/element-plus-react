/* eslint-disable indent */
import classNames from 'classnames';
import { ISplitCode, prefix as addPrefix, namespace } from '../../hooks/prefix';

export type ClassValue = string | number | Record<string, any> | Array<ClassValue> | undefined | null | boolean;

const prefixSplit = (splitCode: ISplitCode, ...classes: ClassValue[]) => {
    const mergeClasses = classes.length
        ? classNames(...classes)
              .split(' ')
              .map(item => addPrefix(`${namespace}-form-item`, item, splitCode))
        : [];

    return mergeClasses.filter(cls => cls).join(' ');
};

export const b = (name: string) => `${namespace}-${name}`;
export const e = (...classes: ClassValue[]) => prefixSplit('__', ...classes);
export const m = (...classes: ClassValue[]) => prefixSplit('--', ...classes);
