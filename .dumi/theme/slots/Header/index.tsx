// @ts-ignore
import logo from '@/theme/images/element-react-logo.svg';
import React from 'react';
import './style.scss';
// import SearchBar from '../SearchBar';
import { Link, useNavData } from 'dumi';

const Header = () => {
    const nav = useNavData();

    return (
        <header className="navbar">
            <div className="navbar-wrapper">
                <div className="header-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img className="logo" src={logo} alt="Element React Logo" />
                        </Link>
                    </div>

                    <div className="content">
                        {/* <SearchBar /> */}
                        <nav className="navbar-menu menu">
                            {nav.map(item => (
                                <Link key={item.link} className="link-item link is-menu-link" to={item.link}>
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
