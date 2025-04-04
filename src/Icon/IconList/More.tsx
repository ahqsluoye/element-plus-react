import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const More: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-regular"
                data-icon="ellipsis"
                className="svg-inline--fa fa-ellipsis fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    d="M400 256C400 282 422 304 448 304S496 282 496 256S474 208 448 208S400 230 400 256ZM112 256C112 230 90 208 64 208S16 230 16 256S38 304 64 304S112 282 112 256ZM304 256C304 230 282 208 256 208S208 230 208 256S230 304 256 304S304 282 304 256Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
More.displayName = 'Icon.More';
