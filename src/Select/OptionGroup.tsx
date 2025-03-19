import classNames from 'classnames';
import React, { Children, FC, cloneElement, forwardRef } from 'react';
import { useClassNames } from '../hooks';
import { SelectOptionGroupProps, SelectOptionProps } from './typings';

const OptionGroup: FC<SelectOptionGroupProps> = forwardRef<HTMLUListElement, SelectOptionGroupProps>((props, ref) => {
    const { e, b } = useClassNames('select-group');
    const { label, disabled } = props;

    return (
        <ul className={classNames(e`wrap`, props.className)} style={props.style} ref={ref}>
            <li className={e`title`}>{label}</li>
            <li>
                <ul className={b()}>
                    {Children.toArray(props.children).map((item: React.ReactElement<SelectOptionProps>) => {
                        return cloneElement(item, {
                            ...item.props,
                            disabled,
                        });
                    })}
                </ul>
            </li>
        </ul>
    );
});

OptionGroup.displayName = 'OptionGroup';

export default OptionGroup;
