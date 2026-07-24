import config from '@/../package.json';
import { ElBacktop, ElIcon, ElSwitch, ElTag } from '@qsxy/element-plus-react';
import { useMount } from 'ahooks';
import { addClass, removeClass } from 'dom-lib';
import { Link, useNavData } from 'dumi';
import React, { useCallback, useRef, useState } from 'react';
import SearchBar from '../SearchBar';
import './style.scss';

interface HeaderProps {
    onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const nav = useNavData();
    const [darkMode, setDarkMode] = useState(localStorage.getItem('el-theme-appearance') === 'dark');
    const switchRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);

    useMount(() => {
        const themeMode = localStorage.getItem('el-theme-appearance');
        if (themeMode === 'dark') {
            setDarkMode(true);
            addClass(document.documentElement, 'dark');
        } else {
            setDarkMode(false);
            removeClass(document.documentElement, 'dark');
        }
        // document.addEventListener('scroll', () => {
        //     if (document.documentElement.scrollTop > 0) {
        //         addStyle(navbarRef.current, 'style', 'display: none');
        //     } else {
        //         addStyle(navbarRef.current, 'style', 'display: block');
        //     }
        // });
    });

    const beforeChange = useCallback(() => {
        return new Promise<boolean>(resolve => {
            const isAppearanceTransition = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!isAppearanceTransition) {
                resolve(true);
                return;
            }

            const switchElement = switchRef.current;
            const rect = switchElement.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

            const ratioX = (100 * x) / innerWidth;
            const ratioY = (100 * y) / innerHeight;
            const referR = Math.hypot(innerWidth, innerHeight) / Math.SQRT2;
            const ratioR = (100 * endRadius) / referR;

            const transition = document.startViewTransition(async () => {
                resolve(true);
                await window.requestAnimationFrame(() => {
                    document.documentElement.classList.toggle('dark');
                });
            });
            transition.ready.then(() => {
                const clipPath = [`circle(0% at ${ratioX}% ${ratioY}%)`, `circle(${ratioR}% at ${ratioX}% ${ratioY}%)`];
                document.documentElement.animate(
                    {
                        clipPath: !darkMode ? [...clipPath].reverse() : clipPath,
                    },
                    {
                        duration: 400,
                        easing: 'ease-in',
                        pseudoElement: !darkMode ? '::view-transition-old(root)' : '::view-transition-new(root)',
                    },
                );
            });
        });
    }, [darkMode]);

    return (
        <header className="navbar">
            <div ref={navbarRef} className="navbar-wrapper">
                <div className="header-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img className="logo" src={require('@/theme/images/element-react-logo.svg').default} alt="Element React Logo" />
                        </Link>
                    </div>
                    <div className="version">
                        <ElTag type="primary" size="small" round className="version-tag">
                            {config.version}
                        </ElTag>
                    </div>

                    <div className="content">
                        <SearchBar />
                        <nav className="navbar-menu menu">
                            {nav.map(item => (
                                <Link key={item.link} className="link-item link is-menu-link" to={item.link}>
                                    {item.title}
                                </Link>
                            ))}
                            <div className="theme-toggler-content theme-toggler">
                                <ElSwitch
                                    ref={switchRef}
                                    value={darkMode}
                                    activeAction={<ElIcon name="moon-stars" prefix="fas" className="dark-icon" />}
                                    inactiveAction={<ElIcon name="sun-bright" prefix="fas" className="light-icon" />}
                                    inlinePrompt
                                    beforeChange={beforeChange}
                                    onChange={(_, checked, e) => {
                                        setDarkMode(checked);
                                        localStorage.setItem('el-theme-appearance', checked ? 'dark' : 'light');
                                    }}
                                />
                            </div>
                            <div className="social-link">
                                <a href="https://github.com/ahqsluoye/element-plus-react" target="_blank" rel="noopener noreferrer">
                                    <ElIcon name="github" prefix="fab" className="github-icon" />
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="mobile-action-bar">
                <button className="mobile-menu-btn" onClick={onMenuClick}>
                    <ElIcon name="align-left" className="menu-icon" style={{ color: '--el-text-color-secondary)' }} />
                    <span className="menu-text" style={{ fontSize: 16 }}>
                        Menu
                    </span>
                </button>
                <div className="mobile-backtop">
                    <ElBacktop>
                        <ElIcon name="angle-up" prefix="far" />
                    </ElBacktop>
                </div>
            </div>
        </header>
    );
};

export default Header;
