import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import { mergeDefaultProps } from '../Util';
import { TypeComponentsMap } from '../config/Constants';
import { useClassNames } from '../hooks';
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
        <Transition visible={visible} name={b`fade`} duration={300} nodeRef={nodeRef} display="flex">
            <div ref={nodeRef} className={classNames(b(), m(type), is({ center }, effect), className)} role="alert" style={style}>
                {showIcon && (icon || TypeComponentsMap[type]) && (
                    <Icon name={icon || TypeComponentsMap[type]} prefix="fas" className={classNames(e('icon'), is({ big: hasDesc }))} />
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
                                <Icon name="xmark" className={e`close-btn`} onClick={handleClose} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </Transition>
    );
};

Alert.displayName = 'ElAlert';

export default Alert;
