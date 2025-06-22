import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../hooks';
import { PagerProps } from './typings';

const Pager: FC<PagerProps> = props => {
    const { classPrefix = 'pagination-item', page, active, disabled, onClick } = props;
    const { b, is } = useClassNames(classPrefix);

    const handleClick = () => {
        onClick?.(page);
    };

    return (
        <li
            className={classNames(
                'number',
                is({ active, disabled }),
                {
                    [b`disabled`]: !page,
                },
                props.className,
            )}
            onClick={handleClick}
            tabIndex={0}
        >
            {page}
        </li>
    );
};

export default Pager;
