import { Options, Placement, State, StrictModifiers } from '@popperjs/core';
import fromPairs from 'lodash/fromPairs';
import { useMemo } from 'react';
import { PopperOptions } from './typings';

type IUsePopperProps = {
    popperOptions?: Options;
    arrowOffset?: number;
    offset?: number;
    placement?: Placement;
    gpuAcceleration?: boolean;
} & Pick<PopperOptions, 'fallbackPlacements'>;

type ModifierProps = {
    offset?: number;
    arrow?: HTMLElement;
    arrowOffset?: number;
    gpuAcceleration?: boolean;
    placement?: Placement;
} & Pick<PopperOptions, 'fallbackPlacements'>;

export default function usePopperOptions(props: IUsePopperProps, arrowElement) {
    return useMemo(() => {
        return {
            placement: props.placement,
            ...props.popperOptions,
            // Avoiding overriding modifiers.
            modifiers: buildModifier(
                {
                    arrow: arrowElement,
                    arrowOffset: props.arrowOffset,
                    offset: props.offset,
                    gpuAcceleration: props.gpuAcceleration,
                    placement: props.placement,
                    fallbackPlacements: props.fallbackPlacements,
                },
                props.popperOptions?.modifiers,
            ),
        };
    }, [arrowElement, props.arrowOffset, props.fallbackPlacements, props.gpuAcceleration, props.offset, props.placement, props.popperOptions]);
}

function deriveState(state: State) {
    const elements = Object.keys(state.elements) as unknown as Array<keyof State['elements']>;

    const styles = fromPairs(elements.map(element => [element, state.styles[element] || {}] as [string, State['styles'][keyof State['styles']]]));

    const attributes = fromPairs(elements.map(element => [element, state.attributes[element]] as [string, State['attributes'][keyof State['attributes']]]));

    return {
        styles,
        attributes,
    };
}

const states = {
    styles: {
        popper: {
            position: 'absolute',
            left: '0',
            top: '0',
        },
        arrow: {
            position: 'absolute',
        },
    },
    attributes: {},
};

export function buildModifier(props: ModifierProps, externalModifiers: StrictModifiers[] = []) {
    const { arrow, arrowOffset, offset, gpuAcceleration, placement, fallbackPlacements } = props;

    const modifiers: Array<StrictModifiers> = [
        {
            name: 'offset',
            options: {
                offset: [0, offset ?? 10],
            },
        },
        {
            name: 'preventOverflow',
            options: {
                padding: {
                    top: 2,
                    bottom: 2,
                    left: 5,
                    right: 5,
                },
            },
        },
        {
            name: 'updateState',
            enabled: true,
            phase: 'write',
            fn: ({ state }) => {
                const derivedState = deriveState(state);

                Object.assign(states, derivedState);
            },
            requires: ['computeStyles'],
        } as any,
        {
            name: 'flip',
            options: {
                padding: 5,
                fallbackPlacements: (() => {
                    if (fallbackPlacements) {
                        if (typeof fallbackPlacements === 'function') {
                            return fallbackPlacements(placement);
                        }
                        return fallbackPlacements;
                    } else {
                        if (placement === 'bottom-start') {
                            return ['bottom', 'top-start', 'right', 'left'];
                        }
                        return ['bottom', 'top', 'right', 'left'];
                    }
                })(),
            },
        },
        {
            name: 'computeStyles',
            options: {
                gpuAcceleration,
                adaptive: gpuAcceleration,
            },
        },
        // { name: 'applyStyles', enabled: false },
        { name: 'eventListeners', enabled: true, options: { scroll: false, resize: true } },
        // tippyModifier,
    ];

    if (arrow) {
        modifiers.push({
            name: 'arrow',
            options: {
                element: arrow,
                // the arrow size is an equailateral triangle with 10px side length, the 3rd side length ~ 14.1px
                // adding a offset to the ceil of 4.1 should be 5 this resolves the problem of arrow overflowing out of popper.
                padding: arrowOffset ?? 10,
            },
        });
    }

    // @ts-ignore
    modifiers.push(...externalModifiers);
    return modifiers;
}
