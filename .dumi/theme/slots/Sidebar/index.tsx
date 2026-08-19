import { ElScrollbar, ElTag } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import { Link, useFullSidebarData } from 'dumi';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';

interface SidebarProps {
    onCloseDrawer?: () => void;
}

export type SidebarRef = {
    handleScrollIntoView: (isLayer?: boolean) => void;
};

const Sidebar = memo(({ ref, ...props }: SidebarProps & { ref?: React.RefObject<SidebarRef | null> }) => {
    const { onCloseDrawer } = props;
    const location = useLocation();
    const fullsidebar = useFullSidebarData();
    const [active, setActive] = useState(location.pathname);
    const path = useMemo(() => {
        return (
            Object.keys(fullsidebar)
                .filter(key => key.split('/').filter(Boolean).length <= (location.pathname.startsWith('/en-US/') ? 2 : 1))
                .find(key => location.pathname.startsWith(key)) || '/'
        );
    }, [fullsidebar, location.pathname]);

    const handleScrollIntoView = (isLayer = false) => {
        const node = document.querySelector(`${isLayer ? '.mobile-sidebar-drawer ' : ''}[href="${location.pathname}"]`);
        if (node) {
            scrollIntoView(node, {
                scrollMode: 'if-needed',
                block: 'center',
            });
        }
    };

    useEffect(() => {
        setActive(location.pathname);
        handleScrollIntoView();
    }, [location.pathname]);

    React.useImperativeHandle(ref, () => ({
        handleScrollIntoView,
    }));

    return (
        <ElScrollbar className="sidebar">
            <div className="sidebar-groups">
                {fullsidebar[path]?.map((group, index) => (
                    <section key={index} className="sidebar-group">
                        <p className="sidebar-group__title">{group.title}</p>
                        {group.children.map(item => (
                            <Link
                                key={item.link}
                                to={item.link}
                                className={classNames('link', {
                                    active: active === item.link,
                                })}
                                onClick={() => {
                                    setActive(item.link);
                                    onCloseDrawer?.();
                                }}
                            >
                                <p className="link-text">
                                    {item.title}{' '}
                                    {item.version && (
                                        <ElTag type="primary" round effect="plain" size="small">
                                            {item.version}
                                        </ElTag>
                                    )}
                                </p>
                            </Link>
                        ))}
                    </section>
                ))}
            </div>
        </ElScrollbar>
        // <div className="dumi-default-sidebar">
        //   {meta[path].map((item, i) => (
        //     <dl className="dumi-default-sidebar-group" key={String(i)}>
        //       {item.title && <dt>{item.title}</dt>}
        //       {item.children.map((child) => (
        //         <dd key={child.link}>
        //           <Link to={child.link} title={child.title}>
        //             {child.title}
        //           </Link>
        //           {/* {child.link === pathname && meta.frontmatter.toc === 'menu' && (
        //             <Toc />
        //           )} */}
        //         </dd>
        //       ))}
        //     </dl>
        //   ))}
        // </div>
    );
});

export default Sidebar;
