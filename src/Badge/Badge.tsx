import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import React, { forwardRef, memo, useMemo, useRef } from 'react';
import Transition from '../Transition/Transition';
import { partitionHTMLProps, useClassNames } from '../hooks';
import { BadgeProps } from './typings';

const Badge = memo(
    forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
        const { type = 'danger', isDot, value, max, hidden, showZero = true, color, offset = [], badgeClass, badgeStyle = {} } = props;
        const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });
        const { b, e, em, is } = useClassNames('badge');

        const nodeRef = useRef(null);

        const content = useMemo<string>(() => {
            if (isDot) {
                return '';
            }

            if (isNumber(value) && isNumber(max)) {
                return max < value ? `${max}+` : `${value}`;
            }
            return `${value}`;
        }, [isDot, max, value]);

        return (
            <div ref={ref} className={classNames(b(), props.className)} style={props.style} {...tooltipEvents}>
                {props.children}
                <Transition nodeRef={nodeRef} name={b('zoom-in-center', false)} visible={!hidden && (!!content || isDot) && !(!showZero && value === 0)} display="inline-flex">
                    <sup
                        ref={nodeRef}
                        className={classNames(e`content`, em('content', type), is({ fixed: !!props.children, dot: isDot }), badgeClass)}
                        style={{ background: color, marginRight: offset?.[0] ? -offset[0] : null, marginTop: offset?.[1], ...badgeStyle }}
                    >
                        {content}
                    </sup>
                </Transition>
            </div>
        );
    }),
);

Badge.displayName = 'ElBadge';

export default Badge;
