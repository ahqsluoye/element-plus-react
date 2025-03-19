import { ElScrollbar } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import { Link, useSidebarData } from 'dumi';
import React, { FC, memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';

const Sidebar: FC = memo(() => {
    const location = useLocation();
    const sidebar = useSidebarData();
    const [active, setActive] = useState(location.pathname);
    // const path = useMemo(() => (location.pathname.startsWith('/components') ? '/components' : location.pathname), [location.pathname]);

    useEffect(() => {
        const node = document.querySelector(`[href="${active}"]`);
        if (node) {
            scrollIntoView(node, {
                scrollMode: 'if-needed',
                block: 'center',
            });
        }
    }, [active]);

    return (
        <ElScrollbar className="sidebar">
            <aside>
                <div className="sidebar-groups">
                    {sidebar.map(group => (
                        <section key={group.title} className="sidebar-group">
                            <p className="sidebar-group__title">{group.title}</p>
                            {group.children.map(item => (
                                <Link
                                    key={item.link}
                                    to={item.link}
                                    className={classNames('link', {
                                        active: active === item.link,
                                    })}
                                    onClick={() => setActive(item.link)}
                                >
                                    <p className="link-text">{item.title}</p>
                                </Link>
                            ))}
                        </section>
                    ))}
                </div>
            </aside>
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
