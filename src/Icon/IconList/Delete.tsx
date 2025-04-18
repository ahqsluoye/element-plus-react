import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Delete: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-regular"
                data-icon="hexagon-xmark"
                className="svg-inline--fa fa-hexagon-xmark fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M506 233L400 54C392 41 377 32 361 32H151C134 32 120 41 112 54L6 233C-2 247 -2 265 6 279L112 458C120 471 134 480 151 480H361C378 480 392 471 400 458L506 279C514 265 514 247 506 233ZM360 432H152L49 256L152 80H360L463 256L360 432ZM341 171L341 171C331 162 316 162 307 171L256 222L205 171C196 162 181 162 171 171V171C162 181 162 196 171 205L222 256L171 307C162 316 162 331 171 341L171 341C181 350 196 350 205 341L256 290L307 341C316 350 331 350 341 341L341 341C350 331 350 316 341 307L290 256L341 205C350 196 350 181 341 171Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Delete.displayName = 'Icon.Delete';
