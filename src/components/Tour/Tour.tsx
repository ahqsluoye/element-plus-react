import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { useZIndex } from '@qsxy/element-plus-react/hooks/useZIndex';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import isBoolean from 'lodash/isBoolean';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Content from './Content';
import { TourContext } from './context';
import { useTarget } from './helper';
import Mask from './Mask';
import ElStep from './Step';
import type { TourMask, TourProps, TourStepProps } from './typings';

function resolveAppendTo(appendTo: string | HTMLElement): HTMLElement {
    if (typeof appendTo === 'string') {
        return document.querySelector(appendTo) || document.body;
    }
    return appendTo;
}

function Tour(props: TourProps) {
    props = mergeDefaultProps(
        {
            defaultCurrent: 0,
            showArrow: true,
            showClose: true,
            placement: 'bottom',
            mask: true,
            gap: { offset: 6, radius: 2 },
            scrollIntoViewOptions: { block: 'center' },
            appendTo: 'body',
            closeOnPressEscape: true,
            targetAreaClickable: true,
            closeIcon: 'xmark',
        },
        props,
    );
    const {
        showArrow,
        showClose,
        closeIcon,
        placement: placementProp,
        contentStyle,
        mask: maskProp,
        gap: gapProp,
        zIndex: zIndexProp,
        scrollIntoViewOptions: scrollIntoViewOptionsProp,
        type: typeProp,
        appendTo,
        closeOnPressEscape,
        targetAreaClickable,
        onChange,
        onClose,
        onFinish,
        children,
        indicators,
        className,
        style,
    } = props;

    const ns = useClassNames('tour');
    const [visible, setVisible] = useControlled(props.visible, props.defaultVisible);
    const [current, setCurrent] = useControlled(props.current, props.defaultCurrent);
    const [total, setTotal] = useState(0);

    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);
    const stepChildren = useMemo(() => childrenArray.filter(child => React.isValidElement(child) && (child as React.ReactElement).type === ElStep), [childrenArray]);
    const currentChild = useMemo(() => stepChildren[current] || null, [stepChildren, current]);
    const currentStep = useMemo(() => (React.isValidElement(currentChild) ? ((currentChild as React.ReactElement).props as TourStepProps) : undefined), [currentChild]);

    const currentTarget = useMemo(() => currentStep?.target, [currentStep?.target]);

    const mergedPlacement = useMemo(() => currentStep?.placement || placementProp, [currentStep?.placement, placementProp]);
    const mergedContentStyle = useMemo(() => currentStep?.contentStyle ?? contentStyle, [currentStep?.contentStyle, contentStyle]);

    const mergedMask: TourMask = useMemo(() => currentStep?.mask ?? maskProp, [currentStep?.mask, maskProp]);
    const mergedShowMask = useMemo(() => !!mergedMask && visible, [mergedMask, visible]);
    const mergedMaskStyle = useMemo(() => (isBoolean(mergedMask) ? undefined : mergedMask), [mergedMask]);

    const mergedShowArrow = useMemo(() => !!(currentTarget && (currentStep?.showArrow ?? showArrow)), [currentTarget, currentStep?.showArrow, showArrow]);

    const mergedScrollIntoViewOptions = useMemo(
        () => currentStep?.scrollIntoViewOptions ?? scrollIntoViewOptionsProp,
        [currentStep?.scrollIntoViewOptions, scrollIntoViewOptionsProp],
    );
    const mergedType = useMemo(() => currentStep?.type ?? typeProp, [currentStep?.type, typeProp]);

    const mergedZIndex = useZIndex(visible, zIndexProp);

    const { mergedPosInfo, triggerTarget } = useTarget(currentTarget, visible, gapProp, mergedMask, mergedScrollIntoViewOptions);

    const handlePrev = useCallback(() => {
        const prev = current - 1;
        setCurrent(prev);
        currentStep?.prevButtonProps?.onClick();
        onChange?.(prev, visible);
    }, [current, setCurrent, currentStep?.prevButtonProps, onChange, visible]);

    const handleFinish = useCallback(() => {
        setVisible?.(false);
        onClose?.(current);
        onFinish?.();
        onChange?.(current, false);
    }, [current, onClose, onFinish, setVisible, onChange]);

    const handleNext = useCallback(() => {
        if (current >= total - 1) {
            handleFinish();
        } else {
            const next = current + 1;
            setCurrent(next);
            currentStep?.nextButtonProps?.onClick();
            onChange?.(next, visible);
        }
    }, [current, total, handleFinish, setCurrent, currentStep?.nextButtonProps, onChange, visible]);

    const handleClose = useCallback(() => {
        setVisible?.(false);
        onClose?.(current);
        onChange?.(current, false);
    }, [setVisible, onClose, current, onChange]);

    const handleEscClose = useCallback(() => {
        if (closeOnPressEscape) {
            handleClose();
        }
    }, [closeOnPressEscape, handleClose]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && visible) {
            handleEscClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        setTotal(stepChildren.length);
    }, [stepChildren.length]);

    // useEffect(() => {
    //     setCurrent(currentProp);
    // }, [currentProp]);

    useEffect(() => {
        if (!visible) {
            setCurrent(0);
            if (portalContainer) {
                removeClass(portalContainer, ns.b('parent--hidden'));
            }
        } else {
            if (portalContainer && maskProp) {
                addClass(portalContainer, ns.b('parent--hidden'));
            }
        }
    }, [visible]);

    const contextValue = useMemo(
        () => ({
            current,
            total,
            showClose,
            closeIcon,
            mergedType: mergedType as 'default' | 'primary' | undefined,
            ns,
            indicators,
            onPrev: handlePrev,
            onNext: handleNext,
            onFinish: handleFinish,
            onClose: handleClose,
        }),
        [current, total, showClose, closeIcon, mergedType, ns, indicators, handlePrev, handleNext, handleFinish, handleClose],
    );

    const kls = classNames(ns.b(), mergedType === 'primary' ? ns.m('primary') : '', className);

    const portalContainer = useMemo(() => resolveAppendTo(appendTo), [appendTo]);

    return ReactDOM.createPortal(
        <div className={kls} style={style}>
            <Mask
                visible={mergedShowMask}
                fill={mergedMaskStyle?.color}
                style={mergedMaskStyle?.style}
                pos={mergedPosInfo}
                zIndex={mergedZIndex}
                targetAreaClickable={targetAreaClickable}
            />
            {visible && currentChild ? (
                <TourContext value={contextValue}>
                    <Content
                        reference={triggerTarget || undefined}
                        placement={mergedPlacement}
                        showArrow={mergedShowArrow}
                        zIndex={mergedZIndex}
                        style={mergedContentStyle}
                        onClose={handleEscClose}
                    >
                        {currentChild}
                    </Content>
                </TourContext>
            ) : null}
        </div>,
        portalContainer,
    );
}

Tour.displayName = 'ElTour';

export default Tour;
