import Header from '@/theme/slots/Header';
import Home from '@/theme/slots/Home';
import Main from '@/theme/slots/Main';
import Sidebar from '@/theme/slots/Sidebar';
import { ElConfigProvider } from '@qsxy/element-plus-react';
import '@qsxy/element-plus-react/theme-chalk/dark/css-vars.scss';
import '@qsxy/element-plus-react/theme-chalk/dev.scss';
import { Helmet, useIntl, useRouteMeta, useSidebarData } from 'dumi';
import React, { FC, memo } from 'react';
import './style';

const DocLayout: FC = memo(() => {
    const intl = useIntl();

    const sidebar = useSidebarData();
    // const { hash, pathname } = useLocation();
    // const { loading, hostname, demos } = useSiteData();
    // const [activateSidebar, updateActivateSidebar] = useState(false);
    const { frontmatter: fm } = useRouteMeta();

    const showSidebar = fm.sidebar !== false && sidebar?.length > 0;
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
                <Header />
                <Home />
                {showSidebar && <Sidebar />}

                {'hero' in fm ? null : (
                    <ElConfigProvider locale="zh-CN">
                        <Main />
                    </ElConfigProvider>
                )}
            </div>
        </>
    );
});

export default DocLayout;
