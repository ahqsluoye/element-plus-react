import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { Children, FC, useEffect, useRef } from 'react';
import { mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import { SkeletonContext } from './SkeletonContext';
import SkeletonItem from './SkeletonItem';
import { SkeletonProps } from './typings';

const SkeletonCore = (props: SkeletonProps) => {
    const { animated, rows = 4, variant, rowHeight = 16, rowMargin = 16, classPrefix = 'skeleton', formatter, className, style } = props;

    const { b, wb } = useClassNames(classPrefix);

    return (
        <SkeletonContext.Provider value={{ rowHeight, rowMargin, rows }}>
            <div className={classNames(className, wb('paragraph', { active: animated }))} style={style}>
                {variant && (
                    <div className={b('paragraph-graph', `paragraph-graph-${variant}`)}>
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
                )}

                <div className={b`paragraph-rows`}>
                    {Children.count(formatter) === 0 ? new Array(rows).fill(0).map((_, index) => <SkeletonItem key={index} isFirst={index === 0} />) : formatter}
                </div>
            </div>
        </SkeletonContext.Provider>
    );
};

const Skeleton: FC<SkeletonProps> = (props: SkeletonProps) => {
    props = mergeDefaultProps({ visible: true }, props);
    const { defaultVisible, throttle, children } = props;

    const initLoad = useRef(false);

    const [visible, setVisible] = useControlled(undefined, defaultVisible ?? props.visible);

    const display = debounce(() => setVisible(true), typeof throttle === 'number' ? throttle : throttle?.leading ?? 0);
    const hide = debounce(() => setVisible(false), typeof throttle !== 'number' ? throttle?.trailing ?? 0 : 0);

    useEffect(() => {
        if (defaultVisible === true && !initLoad.current) {
            setVisible(true);
        } else {
            props.visible ? display() : hide();
        }
        initLoad.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible]);

    return visible ? <SkeletonCore {...props} /> : <>{children}</>;
};

Skeleton.displayName = 'ElSkeleton';

export default Skeleton;
