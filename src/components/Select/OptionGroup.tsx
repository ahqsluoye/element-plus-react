import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { Children, cloneElement } from 'react';
import { SelectOptionGroupProps, SelectOptionProps } from './typings';

const OptionGroup = ({ ref, ...props }: SelectOptionGroupProps & { ref?: React.Ref<HTMLUListElement | null> }) => {
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
};

OptionGroup.displayName = 'ElOptionGroup';

export default OptionGroup;
