import classNames from 'classnames';
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipRef } from '../Tooltip/typings';
import { addUnit, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionPopperPropsUtils, useClassNames } from '../hooks';
import { PopconfirmProps } from './typings';

const Popconfirm = memo(
    forwardRef<TooltipRef, PopconfirmProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                showArrow: true,
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                confirmButtonType: 'primary',
                cancelButtonType: 'primary',
                icon: 'circle-question',
                iconColor: '#f90',
                width: 150,
            },
            props,
        );
        const {
            title,
            confirmButtonText,
            confirmButtonType,
            cancelButtonText,
            cancelButtonType,
            onCancel,
            onConfirm,
            icon,
            iconColor,
            hideIcon,
            classPrefix = 'popconfirm',
            width,
            ...rest
        } = props;
        const [popperProps] = partitionPopperPropsUtils(rest);
        const [transitionProps] = partitionAnimationProps(rest);
        const { b, e } = useClassNames(classPrefix);
        const [visible, setVisible] = useState(false);

        const tooltipRef = useRef<TooltipRef>(null);

        useImperativeHandle(ref, () => tooltipRef.current);

        return (
            <Tooltip
                ref={tooltipRef}
                visible={visible}
                classPrefix={classPrefix}
                popperClass={b('popover', false)}
                popperStyle={{ minWidth: addUnit(width) }}
                triggerRef={props.children}
                enterable
                effect="light"
                trigger="click"
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                contentSlot={
                    <div className={classNames(b())}>
                        <div className={e`main`}>
                            {!hideIcon && <Icon className={e`icon`} name={icon} style={{ color: iconColor }} prefix="fas" />}
                            {title}
                        </div>
                        <div className={e`action`}>
                            <Button
                                type={cancelButtonType}
                                link
                                size="small"
                                onClick={() => {
                                    setVisible(false);
                                    onCancel?.();
                                }}
                                style={{ marginRight: 5 }}
                            >
                                {cancelButtonText}
                            </Button>
                            <Button
                                type={confirmButtonType}
                                size="small"
                                onClick={() => {
                                    setVisible(false);
                                    onConfirm?.();
                                }}
                            >
                                {confirmButtonText}
                            </Button>
                        </div>
                    </div>
                }
                unmountOnExit
                {...popperProps}
                {...transitionProps}
            />
        );
    }),
);

Popconfirm.displayName = 'ElPopconfirm';

export default Popconfirm;
