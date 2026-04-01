import classNames from 'classnames';
import React, { FC, forwardRef, memo } from 'react';
import { useClassNames, useDisabled, useSize } from '../hooks';
import { ButtonGroupContext } from './ButtonGroupContext';
import { ButtonGroupProps } from './typings';

const ButtonGroup: FC<ButtonGroupProps> = memo(
    forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
        const { type, bgColor, borderColor, className, style } = props;
        const { b } = useClassNames('button-group');
        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);

        return (
            <ButtonGroupContext.Provider value={{ type, disabled, size, bgColor, borderColor }}>
                <div className={classNames(b(), className)} style={style} ref={ref}>
                    {props.children}
                </div>
            </ButtonGroupContext.Provider>
        );
    }),
);

export default ButtonGroup;
