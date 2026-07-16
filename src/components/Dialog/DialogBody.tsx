import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { DialogBodyProps } from './typings';

const DialogBody: React.ForwardRefExoticComponent<DialogBodyProps & React.RefAttributes<HTMLDivElement>> = memo(
    forwardRef<HTMLDivElement, DialogBodyProps>((props, ref) => {
        const { classPrefix = 'dialog' } = props;
        const { e } = useClassNames(classPrefix);

        return (
            <div className={classNames(e`body`, props.className)} ref={ref} style={props.style}>
                {props.children}
            </div>
        );
    }),
);

DialogBody.displayName = 'ElDialogBody';

export default DialogBody;
