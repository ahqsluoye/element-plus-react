import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useClassNames } from '../hooks';
import { InputGroupProps } from './typings';

const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => {
    const { prepend, append } = props;
    const { b, m, e } = useClassNames('input-group');

    return (
        <div ref={ref} className={classNames(b('input', false), b(), { [m`prepend`]: prepend, [m`append`]: append }, props.className)} style={props.style}>
            {prepend && <div className={e`prepend`}>{prepend}</div>}
            {props.children}
            {append && <div className={e`append`}>{append}</div>}
        </div>
    );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
