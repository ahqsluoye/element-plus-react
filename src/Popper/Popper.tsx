import classNames from 'classnames';
import startsWith from 'lodash/startsWith';
import React, { FC, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import Transition from '../Transition/Transition';
import { mergeDefaultProps, randomCode } from '../Util';
import PopupManager from '../Util/PopupManager';
import { partitionAnimationProps, useClassNames, useClickOutside, useComponentWillMount } from '../hooks';
import { namespace } from '../hooks/prefix';
import usePopperOptions from './popperOptions';
import { PopperProps } from './typings';

const Popper: FC<PopperProps> = forwardRef((props, ref) => {
    props = mergeDefaultProps(
        {
            arrowOffset: 5,
            appendToBody: true,
            offset: 10,
            placement: 'bottom',
            popperClass: '',
            showArrow: true,
            gpuAcceleration: false,
            strategy: 'absolute',
        },
        props,
    );
    const {
        visible,
        onDestroy,
        referenceElement,
        children,
        appendToBody,
        appendTo = document.body,
        className,
        popperClass,
        showArrow,
        popperStyle,
        popperInstRef,
        onMouseEnter,
        onMouseLeave,
        effect = 'light',
        ...rest
    } = props;
    const [transitionProps] = partitionAnimationProps(rest);

    const id = useMemo(() => props.id ?? randomCode(5), [props.id]);
    const zIndex = useMemo(() => PopupManager.nextZIndex(), []);

    const { b, e, is } = useClassNames('popper');

    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    const popperOptions = usePopperOptions(props, arrowElement);

    const reference = useMemo(() => (referenceElement instanceof Function ? referenceElement() : referenceElement) ?? { current: null }, [referenceElement]);
    const popperInstance = usePopper(reference?.current, popperElement, popperOptions);
    const { styles, attributes, update } = popperInstance;

    const animation = useMemo(() => {
        if (startsWith(popperInstance?.state?.placement || props?.placement, 'top')) {
            return `${namespace}-slide-down`;
        } else if (startsWith(popperInstance?.state?.placement || props?.placement, 'bottom')) {
            return `${namespace}-slide-up`;
        } else if (startsWith(popperInstance?.state?.placement || props?.placement, 'left')) {
            return `${namespace}-slide-right`;
        } else if (startsWith(popperInstance?.state?.placement || props?.placement, 'right')) {
            return `${namespace}-slide-left`;
        }
    }, [popperInstance?.state?.placement, props?.placement]);

    const afterLeave = useCallback(() => {
        setArrowElement(null);
        props.afterLeave?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.afterLeave]);

    // @ts-ignore
    useClickOutside(reference, {
        popperRef: popperElement,
        value: () => {
            onDestroy?.();
        },
    });

    // useEffect(() => {
    //     popperInstRef.current = popperInstance;
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        if (update) {
            if (popperInstRef) {
                popperInstRef.current = popperInstance;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popperInstance]);

    useComponentWillMount(() => {
        if (!transitionProps.unmountOnExit && document.getElementById(`${namespace}-popper-${id}`)) {
            document.getElementById(`${namespace}-popper-${id}`).parentNode.removeChild(document.getElementById(`${namespace}-popper-${id}`));
        }
    });

    useImperativeHandle(ref, () => ({
        popperInstance,
    }));

    const content = useMemo(
        () => (
            <Transition nodeRef={{ current: popperElement }} visible={visible} name={animation} className={className} afterLeave={afterLeave} {...transitionProps}>
                <div
                    id={`${namespace}-popper-${id}`}
                    className={classNames(b(), is(effect), popperClass)}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    style={{ ...styles.popper, ...popperStyle, zIndex }}
                    {...attributes.popper}
                    ref={setPopperElement}
                >
                    {props.children}
                    {showArrow ? <div className={e`arrow`} data-popper-arrow ref={setArrowElement} style={{ ...styles.arrow }} /> : null}
                </div>
            </Transition>
        ),
        [
            afterLeave,
            animation,
            attributes.popper,
            b,
            className,
            e,
            effect,
            id,
            is,
            onMouseEnter,
            onMouseLeave,
            popperClass,
            popperElement,
            popperStyle,
            props.children,
            showArrow,
            styles.arrow,
            styles.popper,
            transitionProps,
            visible,
        ],
    );

    return appendToBody ? createPortal(content, appendTo) : content;
    // <Transition visible={visible} name={animation} className={className} afterLeave={afterLeave} {...transitionProps}>
    //     {Children.toArray(props.children).map(child => {
    //         if (typeof child === 'string' || typeof child === 'number') {
    //             child = <span>{child}</span>;
    //         }
    //         if (child instanceof React.Fragment) {
    //             return null;
    //         }
    //         // @ts-ignore
    //         return cloneElement(child, {
    //             // @ts-ignore
    //             ...child.props,
    //             id: `el-popper-${id}`,
    //             ref: referenceElement,
    //             // @ts-ignore
    //             className: classNames(b(), is(effect), popperClass, child?.props?.className),
    //             style: { ...popperStyle, zIndex: PopupManager.nextZIndex() },
    //             ...attributes.popper,
    //         });
    //     })}
    //     {showArrow ? <div className={e`arrow`} data-popper-arrow ref={setArrowElement} style={{ ...styles.arrow }} /> : null}
    // </Transition>
});

export default Popper;
