import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { memo } from 'react';
import { DialogBodyProps } from './typings';

const DialogBody = memo(({ ref, ...props }: DialogBodyProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { classPrefix = 'dialog' } = props;
    const { e } = useClassNames(classPrefix);

    return (
        <div className={classNames(e`body`, props.className)} ref={ref} style={props.style}>
            {props.children}
        </div>
    );
});

DialogBody.displayName = 'ElDialogBody';

export default DialogBody;
