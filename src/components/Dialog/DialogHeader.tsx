import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import classNames from 'classnames';
import React, { memo, use, useMemo } from 'react';
import { DialogContext } from './DialogContext';
import { DialogHeaderProps } from './typings';

const DialogHeader = memo(({ ref, ...props }: DialogHeaderProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { showClose = true, classPrefix = 'dialog', border } = props;
    const { e, is } = useClassNames(classPrefix);

    const { doClose, center } = use(DialogContext);

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
                            <ElIcon name={'xmark'} className={e`close`} />
                        </button>
                    )}
                </>
            ) : (
                props.children
            )}
        </header>
    );
});

DialogHeader.displayName = 'ElDialogHeader';

export default DialogHeader;
