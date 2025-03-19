import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Search: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-light"
                data-icon="magnifying-glass"
                className="svg-inline--fa fa-magnifying-glass fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M507 485L366 343C397 307 416 260 416 208C416 93 323 0 208 0S0 93 0 208S93 416 208 416C260 416 307 397 343 366L485 507C488 510 492 512 496 512S504 510 507 507C514 501 514 491 507 485ZM208 384C111 384 32 305 32 208S111 32 208 32S384 111 384 208S305 384 208 384Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};

Search.displayName = 'Icon.Search';
