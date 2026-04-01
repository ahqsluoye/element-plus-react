import classNames from 'classnames';
import React, { FC, memo, useContext } from 'react';
import { useClassNames } from '../hooks';
import { DialogContext } from './DialogContext';
import { DialogFooterProps } from './typings';

const DialogFooter: FC<DialogFooterProps> = memo(props => {
    const { classPrefix = 'dialog', position } = props;
    const { e, is } = useClassNames(classPrefix);

    const { center } = useContext(DialogContext);

    return (
        <div className={classNames(e`footer`, is(position || (center ? 'center' : 'right')), props.className)} style={props.style}>
            {props.children}
        </div>
    );
});

DialogFooter.displayName = 'ElDialogFooter';

export default DialogFooter;
