import classNames from 'classnames';
import React, { forwardRef, useCallback } from 'react';
import { Icon } from '../Icon';
import { Transition } from '../Transition';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { TagProps } from './typings';

const Tag = forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            type: 'primary',
            theme: 'light',
        },
        props,
    );
    const { type, closable, size, color, theme, round, hit, classPrefix = 'tag', className, style, onClick, onClose, disableTransitions } = props;
    const { b, m, e, is } = useClassNames(classPrefix);

    const onClickTag = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            event?.stopPropagation();
            onClick?.(event);
        },
        [onClick],
    );

    const onCloseTag = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            event?.stopPropagation();
            onClose?.(event);
        },
        [onClose],
    );

    return (
        // @ts-ignore
        <Transition nodeRef={ref} name={disableTransitions ? '' : 'r-zoom-in-center'} visible display="" transitionAppear unmountOnExit duration={200}>
            <span
                ref={ref}
                className={classNames(b(), m(type, theme, { [size]: size }), is({ round, hit }), className)}
                style={{ background: color, ...style }}
                onClick={onClickTag}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                <span className={e`content`}>{props.children}</span>
                {closable && <Icon name="xmark" className={e`close`} onClick={onCloseTag} />}
            </span>
        </Transition>
    );
});

Tag.displayName = 'Tag';

export default Tag;
