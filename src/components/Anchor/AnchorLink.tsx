import classNames from 'classnames';
import React, { FC, memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { AnchorContext } from './Anchor';
import { AnchorLinkProps } from './typings';

const AnchorLink: FC<AnchorLinkProps> = memo(props => {
    const { title = '', href = '', className, style, children } = props;

    const linkRef = useRef<HTMLAnchorElement>(null);
    const context = useContext(AnchorContext);

    const { ns, direction, currentAnchor, addLink, removeLink, handleClick: contextHandleClick } = context;

    const cls = useMemo(() => {
        return classNames(ns.e`link`, ns.is({ active: currentAnchor === href }));
    }, [ns, currentAnchor, href]);

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            contextHandleClick(e, href);
        },
        [contextHandleClick, href],
    );

    const prevHrefRef = useRef(href);

    // 注册/移除链接
    useEffect(() => {
        if (href) {
            addLink({
                href,
                el: linkRef.current,
            });
        }

        return () => {
            if (href) {
                removeLink(href);
            }
        };
    }, []);

    // 监听 href 变化，更新链接
    useEffect(() => {
        const oldVal = prevHrefRef.current;
        if (oldVal && oldVal !== href) {
            removeLink(oldVal);
        }
        if (href && href !== oldVal) {
            addLink({
                href,
                el: linkRef.current,
            });
        }
        prevHrefRef.current = href;
    }, [href]);

    if (!context) {
        return null;
    }

    return (
        <div className={ns.e`item`}>
            <a ref={linkRef} className={classNames(cls, className)} href={href} style={style} onClick={handleClick}>
                {title}
            </a>
            {children && React.Children.count(children) > 0 && direction === 'vertical' && <div className={ns.e`list`}>{children}</div>}
        </div>
    );
});

AnchorLink.displayName = 'ElAnchorLink';

export default AnchorLink;
