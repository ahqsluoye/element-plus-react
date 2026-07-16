import Button from '@qsxy/element-plus-react/Button/Button';
import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import Tooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import { TooltipRef } from '@qsxy/element-plus-react/Tooltip/typings';
import { addUnit, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PopconfirmProps } from './typings';

const Popconfirm = memo(
    forwardRef<TooltipRef, PopconfirmProps>((props, ref) => {
        const { locale } = useConfigProvider();
        const { t } = useTranslation();

        props = mergeDefaultProps(
            {
                showArrow: true,
                confirmButtonText: t('el.popconfirm.confirmButtonText', { lng: locale }),
                cancelButtonText: t('el.popconfirm.cancelButtonText', { lng: locale }),
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
