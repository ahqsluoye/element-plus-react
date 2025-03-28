import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Question: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-solid"
                data-icon="circle-question"
                className="svg-inline--fa fa-circle-question fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M256 16C123 16 16 123 16 256S123 496 256 496S496 389 496 256S389 16 256 16ZM256 400C238 400 224 386 224 368S238 336 256 336S288 350 288 368S274 400 256 400ZM326 258L280 286V288C280 301 269 312 256 312S232 301 232 288V272C232 264 236 256 244 251L301 217C308 213 312 206 312 198C312 186 302 176 290 176H238C226 176 216 186 216 198C216 211 205 222 192 222S168 211 168 198C168 159 199 128 238 128H290C329 128 360 159 360 198C360 222 347 245 326 258Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Question.displayName = 'Icon.Question';
