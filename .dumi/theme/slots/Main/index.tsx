import { AnchorRef, ElAnchor, ElAnchorLink, ElScrollbar, ElTag, ScrollbarRef } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import { useRouteMeta, useSidebarData, useSiteData, useTabMeta } from 'dumi';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './style.scss';

type AnchorItem = {
    id: string;
    title: string;
    children?: AnchorItem[];
};

const Main = () => {
    const sidebar = useSidebarData();
    const { frontmatter: fm, toc } = useRouteMeta();
    const siteData = useSiteData();
    const tab = useTabMeta();
    const location = useLocation();
    const isEnglish = useMemo(() => location.pathname.startsWith('/en-US'), [location.pathname]);

    const scrollbarRef = useRef<ScrollbarRef>(null);

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

    const [anchorRef, setAnchorRef] = useState<AnchorRef>(null);

    useEffect(() => {
        if (siteData.loading) {
            return;
        }
        anchorRef?.scrollTo('');
        const hash = decodeURIComponent(window.location.hash);
        anchorRef?.scrollTo(hash);
        scrollbarRef.current?.update();
    }, [siteData.loading, location.hash]);

    return (
        <main id="page-content" className={classNames('page-content', { 'has-sidebar': showSidebar })}>
            <div className="doc-content-wrapper">
                <div className="doc-content-container" style={{ flex: isIconList ? 1 : 'unset' }}>
                    <div className="doc-content" style={{ position: 'relative' }}>
                        <Outlet />
                    </div>
                </div>

                {!isIconList && (
                    <div className="toc-wrapper">
                        {anchors.length > 0 && (
                            <nav className="toc-content">
                                <h3 className="toc-content__heading">{isEnglish ? 'CONTENTS' : '目录'}</h3>
                                <ElScrollbar ref={scrollbarRef} maxHeight="calc(100vh - 140px)">
                                    <ElAnchor ref={setAnchorRef} offset={70}>
                                        {anchors.map(item => {
                                            // 分离出标题和版本号
                                            const title = item.title.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}/g, '');
                                            const version = item.title.replace(title, '');
                                            return (
                                                <ElAnchorLink
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    title={
                                                        <>
                                                            {title}
                                                            {version && (
                                                                <ElTag type="primary" round={true} effect="plain" className="version">
                                                                    {version}
                                                                </ElTag>
                                                            )}
                                                        </>
                                                    }
                                                >
                                                    {item?.children?.length > 0 &&
                                                        item.children.map(child => <ElAnchorLink key={child.id} href={`#${child.id}`} title={child.title} />)}
                                                </ElAnchorLink>
                                            );
                                        })}
                                    </ElAnchor>
                                </ElScrollbar>
                            </nav>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Main;
