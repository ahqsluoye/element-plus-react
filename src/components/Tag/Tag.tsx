import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElTransition from '@qsxy/element-plus-react/Transition/Transition';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import classNames from 'classnames';
import { useComposeRef } from 'rc-util/lib/ref';
import React, { memo, useCallback, useRef } from 'react';
import { TagProps } from './typings';

const Tag = memo(({ ref, ...props }: TagProps & { ref?: React.Ref<HTMLElement | null> }) => {
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
        <ElTransition
            nodeRef={containerRef}
            name={disableTransitions ? '' : b('zoom-in-center', false)}
            visible
            display=""
            transitionAppear
            unmountOnExit
            duration={disableTransitions ? 0 : 200}
        >
            <span
                ref={mergedRef}
                className={classNames(b(), m(type, effect, { [size]: size }), is({ closable, round, hit }), className)}
                style={{ background: color, ...style }}
                {...tooltipEvents}
                onClick={onClickTag}
            >
                <span className={e`content`}>{props.children}</span>
                {closable && <ElIcon name="xmark" className={e`close`} onClick={onCloseTag} />}
            </span>
        </ElTransition>
    );
});

Tag.displayName = 'ElTag';

export default Tag;
