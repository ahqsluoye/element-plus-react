import classNames from 'classnames';
import React from 'react';
import { useClassNames } from '../hooks';
import { useSkeletonContext } from './SkeletonContext';
import { SkeletonItemProps } from './typings';

const SkeletonItem = (props: SkeletonItemProps) => {
    const { isFirst, variant, className, style, classPrefix = 'skeleton' } = props;
    const { b, e } = useClassNames(classPrefix);

    const { rowHeight, rowMargin } = useSkeletonContext();

    return variant ? (
        <div className={classNames(b('paragraph-graph', `paragraph-graph-${variant}`), className)} style={style}>
            {variant === 'image' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path
                        fill="currentColor"
                        d="M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112M256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384"
                    ></path>
                </svg>
            ) : null}
            <span className={b`paragraph-graph-inner`} />
        </div>
    ) : (
        <div
            className={classNames(e`item`, className)}
            style={{
                width: `${Math.random() * 75 + 25}%`,
                height: props.rowHeight ?? rowHeight,
                marginTop: isFirst ? Number(props.rowMargin ?? rowMargin) / 2 : props.rowMargin ?? rowMargin,
                ...style,
            }}
        />
    );
};

export default SkeletonItem;
