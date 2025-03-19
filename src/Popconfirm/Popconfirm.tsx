import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import Tooltip from '../Tooltip/Tooltip';
import { partitionAnimationProps, partitionPopperPropsUtils, useClassNames } from '../hooks';
import { PopconfirmProps } from './typings';

const Popconfirm: FC<PopconfirmProps> = props => {
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
        ...rest
    } = props;
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const { b, e } = useClassNames(classPrefix);
    const [visible, setVisible] = useState(false);

    return (
        <Tooltip
            visible={visible}
            classPrefix={classPrefix}
            popperClass={b('popover', false)}
            popperStyle={{ minWidth: 200 }}
            triggerRef={<>{props.children}</>}
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
};

Popconfirm.defaultProps = {
    showArrow: true,
    confirmButtonText: '确 定',
    cancelButtonText: '取 消',
    confirmButtonType: 'primary',
    cancelButtonType: 'primary',
    icon: 'circle-question',
    iconColor: '#f90',
};
Popconfirm.displayName = 'Popconfirm';

export default Popconfirm;
