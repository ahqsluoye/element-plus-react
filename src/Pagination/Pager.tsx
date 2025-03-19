import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../hooks';
import { PagerProps } from './typings';

const Pager: FC<PagerProps> = props => {
    const { classPrefix = 'pagination-item', page, showTitle, active, onClick, itemRender } = props;
    const { b } = useClassNames(classPrefix);

    const handleClick = () => {
        onClick?.(page);
    };

    return (
        <li
            title={showTitle ? page + '' : undefined}
            className={classNames(
                b(),
                b`${page}`,
                {
                    [b`active`]: active,
                    [b`disabled`]: !page,
                },
                props.className,
            )}
            onClick={handleClick}
            tabIndex={0}
        >
            {itemRender?.(page, 'page', <a rel="nofollow">{page}</a>)}
        </li>
    );
};

export default Pager;
