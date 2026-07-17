import { TypeComponentsMap } from '@qsxy/element-plus-react/config/Constants';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElTransition from '@qsxy/element-plus-react/Transition/Transition';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { AlertProps } from './typings';

const Alert = (props: AlertProps) => {
    props = mergeDefaultProps(
        {
            type: 'info',
            closable: true,
            effect: 'light',
        },
        props,
    );
    const { title, description, type, closable, closeText, showIcon, center, effect, onClose, icon, children, className, style } = props;

    const { b, e, m, is } = useClassNames('alert');
    const [visible, setVisible] = useState(true);

    const nodeRef = React.useRef(null);

    const hasDesc = useMemo(() => {
        if (description) {
            return true;
        }
        if (children) {
            return React.Children.toArray(children).some(child => !React.isValidElement(child));
        }
        return false;
    }, [description, children]);

    const handleClose = (evt: React.MouseEvent) => {
        setVisible(false);
        onClose?.(evt.nativeEvent);
    };

    return (
        <ElTransition visible={visible} name={b`fade`} duration={300} nodeRef={nodeRef} display="flex">
            <div ref={nodeRef} className={classNames(b(), m(type), is({ center }, effect), className)} role="alert" style={style}>
                {showIcon && (icon || TypeComponentsMap[type]) && (
                    <ElIcon name={icon || TypeComponentsMap[type]} prefix="fas" className={classNames(e('icon'), is({ big: hasDesc }))} />
                )}

                <div className={e`content`}>
                    {title && (
                        <span
                            className={classNames(e`title`, {
                                'with-description': hasDesc,
                            })}
                        >
                            {title}
                        </span>
                    )}

                    {hasDesc && <p className={e`description`}>{description}</p>}

                    {closable && (
                        <>
                            {closeText ? (
                                <div className={classNames(e`close-btn`, is('customed'))} onClick={handleClose}>
                                    {closeText}
                                </div>
                            ) : (
                                <ElIcon name="xmark" className={e`close-btn`} onClick={handleClose} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </ElTransition>
    );
};

Alert.displayName = 'ElAlert';

export default Alert;
