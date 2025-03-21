import classNames from 'classnames';
import React, { FC, useCallback, useContext } from 'react';
import { Icon } from '../Icon';
import { useClassNames } from '../hooks';
import { DrawerContext } from './DrawerContext';
import { DrawerHeaderProps } from './typings';

const DrawerHeader: FC<DrawerHeaderProps> = props => {
    const { closeButton = true, onClose: onCloseHeader, classPrefix = 'drawer', border } = props;
    const { b, is } = useClassNames(classPrefix);

    const { setVisible, isControlled, onClose } = useContext(DrawerContext);

    /**关闭对话框 */
    const handleCloseDialog = useCallback(() => {
        if (isControlled) {
            onClose?.();
            onCloseHeader?.();
        } else {
            setVisible(false);
        }
    }, [isControlled, onClose, onCloseHeader, setVisible]);

    return (
        <div className={classNames(b`header`, props.className, is({ border }))} style={props.style}>
            <h4 className={b`title`} style={props.titleStyle}>
                {props.children}
            </h4>
            {closeButton && (
                <span className={b`header-close`} onClick={handleCloseDialog}>
                    <Icon name={'xmark'} />
                </span>
            )}
        </div>
    );
};

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
