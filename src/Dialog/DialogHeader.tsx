import classNames from 'classnames';
import React, { forwardRef, memo, useContext, useMemo } from 'react';
import Icon from '../Icon/Icon';
import { useClassNames } from '../hooks';
import { DialogContext } from './DialogContext';
import { DialogHeaderProps } from './typings';

const DialogHeader: React.ForwardRefExoticComponent<DialogHeaderProps & React.RefAttributes<HTMLDivElement>> = memo(
    forwardRef<HTMLDivElement, DialogHeaderProps>((props, ref) => {
        const { showClose = true, classPrefix = 'dialog', border } = props;
        const { e, is } = useClassNames(classPrefix);

        const { doClose, center } = useContext(DialogContext);

        const isString = useMemo(() => typeof props.children === 'string', [props.children]);

        return (
            <div ref={ref} className={classNames(e`header`, is({ border }), { 'show-close': showClose }, props.headerClass)}>
                {isString ? (
                    <>
                        <div className={e`title`} style={center ? { textAlign: 'center' } : {}}>
                            {props.children}
                        </div>
                        {showClose && (
                            <button className={e`headerbtn`} onClick={doClose}>
                                <Icon name={'xmark'} className={e`close`} />
                            </button>
                        )}
                    </>
                ) : (
                    props.children
                )}
            </div>
        );
    }),
);

DialogHeader.displayName = 'ElDialogHeader';

export default DialogHeader;
