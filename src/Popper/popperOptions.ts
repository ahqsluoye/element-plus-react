import { Options, Placement, StrictModifiers } from '@popperjs/core';
import { useMemo } from 'react';

interface IUsePopperProps {
    popperOptions?: Options;
    arrowOffset?: number;
    offset?: number;
    placement?: Placement;
    gpuAcceleration?: boolean;
}

interface ModifierProps {
    offset?: number;
    arrow?: HTMLElement;
    arrowOffset?: number;
    gpuAcceleration?: boolean;
    placement?: Placement;
}

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
                },
                props.popperOptions?.modifiers,
            ),
        };
    }, [arrowElement, props.arrowOffset, props.gpuAcceleration, props.offset, props.placement, props.popperOptions]);
}

export function buildModifier(props: ModifierProps, externalModifiers: StrictModifiers[] = []) {
    const { arrow, arrowOffset, offset, gpuAcceleration, placement } = props;

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
            name: 'flip',
            options: {
                padding: 5,
                fallbackPlacements: (() => {
                    if (placement === 'bottom-start') {
                        return ['bottom', 'top-start', 'right', 'left'];
                    }
                    return ['bottom', 'top', 'right', 'left'];
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
        { name: 'eventListeners', enabled: true, options: { scroll: true, resize: true } },
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
