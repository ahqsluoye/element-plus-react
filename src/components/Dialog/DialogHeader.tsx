import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import classNames from 'classnames';
import React, { forwardRef, memo, useContext, useMemo } from 'react';
import { DialogContext } from './DialogContext';
import { DialogHeaderProps } from './typings';

const DialogHeader: React.ForwardRefExoticComponent<DialogHeaderProps & React.RefAttributes<HTMLDivElement>> = memo(
    forwardRef<HTMLDivElement, DialogHeaderProps>((props, ref) => {
        const { showClose = true, classPrefix = 'dialog', border } = props;
        const { e, is } = useClassNames(classPrefix);

        const { doClose, center } = useContext(DialogContext);

        const isString = useMemo(() => typeof props.children === 'string', [props.children]);

        return (
            <header ref={ref} className={classNames(e`header`, is({ border }), { 'show-close': showClose }, props.headerClass)}>
                {isString ? (
                    <>
                        <span className={e`title`} style={center ? { textAlign: 'center' } : {}}>
                            {props.children}
                        </span>
                        {showClose && (
                            <button className={e`headerbtn`} onClick={doClose}>
                                <Icon name={'xmark'} className={e`close`} />
                            </button>
                        )}
                    </>
                ) : (
                    props.children
                )}
            </header>
        );
    }),
);

DialogHeader.displayName = 'ElDialogHeader';

export default DialogHeader;
