import Header from '@/theme/slots/Header';
import Home from '@/theme/slots/Home';
import Main from '@/theme/slots/Main';
import Sidebar, { SidebarRef } from '@/theme/slots/Sidebar';
import { ElConfigProvider, ElDrawer } from '@qsxy/element-plus-react';
import '@theme-chalk/dark/css-vars.scss';
import '@theme-chalk/dev.scss';
import { Helmet, useIntl, useRouteMeta, useSidebarData } from 'dumi';
import React, { FC, memo, useRef, useState } from 'react';
import './style';

const DocLayout: FC = memo(() => {
    const intl = useIntl();

    const sidebar = useSidebarData();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const { frontmatter: fm } = useRouteMeta();

    const showSidebar = fm.sidebar !== false && sidebar?.length > 0;
    const sidebarRef = useRef<SidebarRef>(null);

    const handleMenuClick = () => {
        setDrawerVisible(true);
    };

    const handleCloseDrawer = () => {
        setDrawerVisible(false);
    };
    // handle hash change or visit page hash after async chunk loaded
    //   useEffect(() => {
    //     const id = hash.replace('#', '');

    //     if (id) {
    //       setTimeout(() => {
    //         const elm = document.getElementById(decodeURIComponent(id));

    //         if (elm) {
    //           // animated-scroll-to instead of native scroll
    //           animateScrollTo(elm.offsetTop - 80, {
    //             maxDuration: 300,
    //           });
    //         }
    //       }, 1);
    //     }
    //   }, [loading, hash]);
    return (
        <>
            <Helmet>
                <html lang={intl.locale.replace(/-.+$/, '')} />
                {fm.title && <meta property="og:title" content={fm.title} />}
                {fm.description && <meta name="description" content={fm.description} />}
                {fm.description && <meta property="og:description" content={fm.description} />}
                {fm.keywords && <meta name="keywords" content={fm.keywords.join(',')} />}
                {fm.keywords && <meta property="og:keywords" content={fm.keywords.join(',')} />}
            </Helmet>

            {/* {isHomePage ? <Home /> : <Docs />} */}
            <div className="App theme-default">
                <Header onMenuClick={handleMenuClick} />
                <Home />
                {showSidebar && <Sidebar />}

                {'hero' in fm ? null : (
                    <ElConfigProvider locale="zh-cn">
                        <Main />
                    </ElConfigProvider>
                )}

                <ElDrawer
                    visible={drawerVisible}
                    onCloseDrawer={handleCloseDrawer}
                    direction="ltr"
                    size="300px"
                    className="mobile-sidebar-drawer"
                    withHeader={false}
                    destroyOnClose={false}
                    style={{ '--el-drawer-padding-primary': '0px' }}
                    zIndex={50000}
                    afterEnter={() => {
                        sidebarRef.current?.handleScrollIntoView(true);
                    }}
                >
                    <Sidebar ref={sidebarRef} onCloseDrawer={handleCloseDrawer} />
                </ElDrawer>
            </div>
        </>
    );
});

export default DocLayout;
