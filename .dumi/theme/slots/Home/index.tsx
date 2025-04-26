import React, { CSSProperties, useMemo } from 'react';
import './style.scss';
import PeopleSvg from './PeopleSvg';
// import { useParallax } from 'react-scroll-parallax';
import ScreenSvg from './ScreenSvg';
import LeftLayerSvg from './LeftLayerSvg';
import LeftBottomSvg from './LeftBottomSvg';
import RightSvg from './RightSvg';
import { useRouteMeta } from 'dumi';

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '.3s ease-out all',
    position: 'relative',
    perspective: '300px',
};

const layerBase: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: '.3s ease-out all',
};

const Home = () => {
    const { frontmatter } = useRouteMeta();

    if (!('hero' in frontmatter)) { return null; }
    // const parallax = useParallax({
    //     speed: -10,
    // });

    // const cardStyle = useMemo(
    //     () => ({
    //         height: '30rem',
    //         width: '100%',
    //         transition: '.3s ease-out all',
    //         transform: `rotateX(${parallax.roll}deg) rotateY(${parallax.tilt}deg)`,
    //     }),
    //     [],
    // );

    // const screenLayer = useMemo(
    //     () => ({
    //         ...layerBase,
    //         width: '80%',
    //         height: '80%',
    //         transform: `translateX(${parallax.tilt * 10 + 80}px) translateY(${parallax.roll * 10 + 50}px)`,
    //     }),
    //     [],
    // );

    // const peopleLayer = useMemo(
    //     () => ({
    //         ...layerBase,
    //         width: '30%',
    //         height: '30%',
    //         right: 0,
    //         bottom: 0,
    //         transform: `translateX(${parallax.tilt * 25 + 25}px) translateY(${parallax.roll * 25}px) scale(1)`,
    //     }),
    //     [],
    // );

    return (
        <main id="page-content" className="page-content">
            <div className="hero-content">
                <div style={{ position: 'relative' }}>
                    <div>
                        <div className="home-page">
                            <div className="banner text-center">
                                <div className="banner-desc mt-4">
                                    <h1>Element Plus React</h1>
                                    <p className="t-2">
                      基于 React，面向设计师和开发者的组件库
                                    </p>
                                </div>
                            </div>
                            <div className="jumbotron">
                                <div
                                    className="parallax-container"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transition: 'all 0.3s ease-out 0s',
                                        position: 'relative',
                                        perspective: 300,
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '30rem',
                                            width: '100%',
                                            transition: 'all 0.3s ease-out 0s',
                                            transform: 'rotateX(0.444916deg) rotateY(-0.245911deg)',
                                        }}
                                    >
                                        <ScreenSvg />
                                        <PeopleSvg className="cursor-pointer" />
                                        <LeftLayerSvg />
                                        <LeftBottomSvg />
                                        <RightSvg />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
