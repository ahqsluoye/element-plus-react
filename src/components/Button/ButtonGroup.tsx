import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { ButtonGroupContext } from './ButtonGroupContext';
import { ButtonGroupProps } from './typings';

const ButtonGroup: FC<ButtonGroupProps> = memo(({ ref, ...props }: ButtonGroupProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { type, bgColor, borderColor, className, style } = props;
    const { b } = useClassNames('button-group');
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    return (
        <ButtonGroupContext value={{ type, disabled, size, bgColor, borderColor }}>
            <div className={classNames(b(), className)} style={style} ref={ref}>
                {props.children}
            </div>
        </ButtonGroupContext>
    );
});

export default ButtonGroup;
