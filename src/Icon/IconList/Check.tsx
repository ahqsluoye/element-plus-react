import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Check: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-light"
                data-icon="check"
                className="svg-inline--fa fa-check fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M475 123L203 395C200 398 196 400 192 400S184 398 181 395L37 251C30 245 30 235 37 229S53 222 59 229L192 361L453 101C459 94 469 94 475 101S482 117 475 123Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};

Check.displayName = 'Icon.Check';
