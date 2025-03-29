import { getOffsetTopByBody } from '@/theme/builtins/IconList/dom';
import { isNotEmpty } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import { addStyle } from 'dom-lib';
import { useRouteMeta, useSidebarData, useTabMeta } from 'dumi';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './style.scss';

type AnchorItem = {
    id: string;
    title: string;
    children?: AnchorItem[];
};

const Main = props => {
    const sidebar = useSidebarData();
    const { frontmatter: fm, toc } = useRouteMeta();
    const tab = useTabMeta();
    const location = useLocation();

    const showSidebar = useMemo(() => fm.sidebar !== false && sidebar?.length > 0, [fm, sidebar]);
    const anchors = useMemo(
        () =>
            (tab?.toc || toc).reduce<AnchorItem[]>((result, item) => {
                if (item.depth === 2) {
                    result.push({ ...item });
                } else if (item.depth === 3) {
                    const parent = result[result.length - 1];
                    if (parent) {
                        parent.children = parent.children || [];
                        parent.children.push({ ...item });
                    }
                }
                return result;
            }, []),
        [toc, tab],
    );
    const isIconList = useMemo(() => location.pathname.endsWith('icon-list'), [location.pathname]);

    const markerRef = useRef();

    const [active, setActive] = useState('');

    const onActive = useCallback(
        (id: string) => {
            setActive(id);
            const index = (tab?.toc || toc).filter(item => item.depth > 1).findIndex(item => item.id === id);
            addStyle(markerRef.current, { top: 36 + 28.5 * index + 'px' });
            (document.documentElement || document.body).scrollTo({ top: getOffsetTopByBody(document.getElementById(id)) - 55, left: 0, behavior: 'instant' });
        },
        [tab?.toc, toc],
    );

    useEffect(() => {
        setActive('');
        if (markerRef.current) addStyle(markerRef.current, { top: 36 + 'px' });
    }, [location.pathname]);

    return (
        <main className={classNames('page-content', { 'has-sidebar': showSidebar })}>
            <div className="doc-content-wrapper">
                <div className="doc-content-container" style={{ flex: isIconList ? 1 : 'unset' }}>
                    <div className="doc-content" style={{ position: 'relative' }}>
                        <Outlet />
                    </div>
                </div>

                {!isIconList && (
                    <div className="toc-wrapper">
                        <nav className="toc-content">
                            <h3 className="toc-content__heading">目录</h3>
                            <ul className="toc-items">
                                {anchors.map(item => {
                                    return (
                                        <li key={item.id} className="toc-item">
                                            <a className={classNames('toc-link', { active: active === item.id })} onClick={() => onActive(item.id)}>
                                                <p>{item.title}</p>
                                            </a>
                                            {item?.children?.length > 0 && (
                                                <ul>
                                                    {item.children.map(item => {
                                                        return (
                                                            <li key={item.id} className="toc-item">
                                                                <a className={classNames('toc-link subitem', { active: active === item.id })} onClick={() => onActive(item.id)}>
                                                                    <p>{item.title}</p>
                                                                </a>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div ref={markerRef} className="toc-marker" style={{ opacity: isNotEmpty(active) ? 1 : 0, top: 36 }}></div>
                        </nav>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Main;
