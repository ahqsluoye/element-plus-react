import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import { PopperProps } from '../Popper';

// @ts-ignore
export const popperAllProps = [
    'popperInstRef',
    'offset',
    'placement',
    'arrowOffset',
    'showArrow',
    'popperClass',
    'popperStyle',
    'name',
    'display',
    'unmountOnExit',
    'transitionAppear',
    'duration',
    'gpuAcceleration',
    'strategy',
    'appendToBody',
    'appendTo',
    'popperOptions',
];

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @param {object} props A ReactElement props object
 * @param {Object} [options={}]
 * @param {Array} [options.htmlProps] An array of html input props
 * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
 * @returns {[{}, {}]} An array of objects
 */
export const partitionPopperPropsUtils = (props: any, options: any = {}): [Partial<PopperProps>, any] => {
    const { popperProps = popperAllProps } = options;

    const inputProps: Partial<PopperProps> = {};
    const rest = {};

    forEach(props, (val, prop) => {
        const target: any = includes(popperProps, prop) ? inputProps : rest;
        target[prop] = val;
    });

    return [inputProps, rest];
};
