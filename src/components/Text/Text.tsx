import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import { isUndefined, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { FC, memo, useEffect, useMemo, useRef } from 'react';
import { TextProps } from './typings';

const Text: FC<TextProps> = memo((props: TextProps) => {
    props = mergeDefaultProps({ truncated: false, tag: 'span' }, props);
    const { type, size, truncated, lineClamp, tag, title, children, className, style } = props;

    const { b, m, is } = useClassNames('text');
    const textSize = useSize(size);

    const textRef = useRef<HTMLElement>(null);

    const textKls = useMemo(
        () => classNames([b(), m(type), m(textSize || size), is({ truncated, 'line-clamp': !isUndefined(lineClamp) })], className),
        [b, m, type, textSize, size, is, truncated, lineClamp, className],
    );

    // 绑定 title 属性的逻辑
    const bindTitle = () => {
        // 如果外部已经提供了 title，则不添加
        if (title) {
            return;
        }

        const element = textRef.current;
        if (!element) {
            return;
        }

        let shouldAddTitle = false;
        const text = element.textContent || '';

        if (truncated) {
            const width = element.offsetWidth;
            const scrollWidth = element.scrollWidth;

            if (width && scrollWidth && scrollWidth > width) {
                shouldAddTitle = true;
            }
        } else if (!isUndefined(lineClamp)) {
            const height = element.offsetHeight;
            const scrollHeight = element.scrollHeight;

            if (height && scrollHeight && scrollHeight > height) {
                shouldAddTitle = true;
            }
        }

        if (shouldAddTitle) {
            element.setAttribute('title', text);
        } else {
            element.removeAttribute('title');
        }
    };

    // 每次渲染后都执行 title 绑定
    useEffect(() => {
        bindTitle();
    }, [children]);

    return React.createElement(tag, { ref: textRef, className: textKls, style: { WebkitLineClamp: lineClamp, ...style } }, children);
});

Text.displayName = 'ElText';

export default Text;
