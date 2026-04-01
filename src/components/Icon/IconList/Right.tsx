import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Right: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-light"
                data-icon="angle-right"
                className="svg-inline--fa fa-angle-right fa-w-8"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
            >
                <path
                    d="M204 267L60 427C54 433 44 434 37 428C30 422 31 412 36 405L170 256L36 107C30 100 31 90 37 84C44 78 54 79 60 85L204 245C209 251 209 261 204 267Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Right.displayName = 'Icon.Right';
