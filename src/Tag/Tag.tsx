import classNames from 'classnames';
import { useComposeRef } from 'rc-util/lib/ref';
import React, { forwardRef, memo, useCallback, useRef } from 'react';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import { mergeDefaultProps } from '../Util';
import { partitionHTMLProps, useClassNames, useSize } from '../hooks';
import { TagProps } from './typings';

const Tag = memo(
    forwardRef<HTMLElement, TagProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                type: 'primary',
                effect: 'light',
            },
            props,
        );

        const { type, closable, color, effect, round, hit, classPrefix = 'tag', className, style, onClick, onClose, disableTransitions } = props;
        const { b, m, e, is } = useClassNames(classPrefix);
        const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });
        const size = useSize(props.size);

        const containerRef = useRef<HTMLElement>(null);

        const mergedRef = useComposeRef(ref, containerRef);

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
            <Transition nodeRef={containerRef} name={disableTransitions ? '' : b('zoom-in-center', false)} visible display="" transitionAppear unmountOnExit duration={200}>
                <span
                    ref={mergedRef}
                    className={classNames(b(), m(type, effect, { [size]: size }), is({ closable, round, hit }), className)}
                    style={{ background: color, ...style }}
                    {...tooltipEvents}
                    onClick={onClickTag}
                >
                    <span className={e`content`}>{props.children}</span>
                    {closable && <Icon name="xmark" className={e`close`} onClick={onCloseTag} />}
                </span>
            </Transition>
        );
    }),
);

Tag.displayName = 'ElTag';

export default Tag;
