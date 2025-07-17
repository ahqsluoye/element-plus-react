import useParallax from '@/theme/hooks/useParallax';
import { useRouteMeta } from 'dumi';
import React, { CSSProperties, useMemo, useRef } from 'react';
import LeftBottomSvg from './LeftBottomSvg';
import LeftLayerSvg from './LeftLayerSvg';
import PeopleSvg from './PeopleSvg';
import RightSvg from './RightSvg';
import ScreenSvg from './ScreenSvg';
import './style.scss';

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
    // const parallax = useParallax<HTMLDivElement>({
    //     speed: -10,
    // });
    // console.log(parallax);
    const target = useRef(null);

    const parallax = useParallax(target);
    // const parallax = { roll: 0, tilt: 0 };

    // const parallax = useParallax({
    //     speed: -10,
    // });

    const cardStyle = useMemo(
        () => ({
            height: '30rem',
            width: '100%',
            transition: '.3s ease-out all',
            transform: `rotateX(${parallax.roll}deg) rotateY(${parallax.tilt}deg)`,
        }),
        [parallax],
    );

    const screenLayer = useMemo(
        () => ({
            ...layerBase,
            width: '80%',
            height: '80%',
            transform: `translateX(${parallax.tilt * 10 + 80}px) translateY(${parallax.roll * 10 + 50}px)`,
        }),
        [parallax],
    );

    const peopleLayer = useMemo(
        () => ({
            ...layerBase,
            width: '30%',
            height: '30%',
            right: 0,
            bottom: 0,
            transform: `translateX(${parallax.tilt * 25 + 25}px) translateY(${parallax.roll * 25}px) scale(1)`,
        }),
        [parallax],
    );

    // center layer
    const leftLayer = useMemo(
        () => ({
            ...layerBase,
            width: '20%',
            height: '20%',
            transform: `translateX(${parallax.tilt * 12 + 205}px) translateY(${parallax.roll * 12 + 210}px)`,
        }),
        [parallax],
    );

    const leftBottomLayer = useMemo(
        () => ({
            ...layerBase,
            width: '30%',
            height: '30%',
            left: 0,
            bottom: 0,
            transform: `translateX(${parallax.tilt * 30 - 10}px) translateY(${parallax.roll * 30}px)`,
        }),
        [parallax],
    );

    const rightLayer = useMemo(
        () => ({
            ...layerBase,
            width: '33%',
            height: '33%',
            top: 0,
            right: 0,
            transform: `translateX(${parallax.tilt * 25 + 5}px) translateY(${parallax.roll * 25}px)`,
        }),
        [parallax],
    );

    if (!('hero' in frontmatter)) {
        return null;
    }

    return (
        <main id="page-content" className="page-content">
            <div className="hero-content">
                <div style={{ position: 'relative' }}>
                    <div>
                        <div ref={target} className="home-page">
                            <div className="banner text-center">
                                <div className="banner-desc mt-4">
                                    <h1>Element Plus React</h1>
                                    <p className="t-2">基于 React，面向设计师和开发者的组件库</p>
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
                                    <div style={cardStyle}>
                                        <ScreenSvg style={screenLayer} />
                                        <PeopleSvg className="cursor-pointer" style={peopleLayer} />
                                        <LeftLayerSvg style={leftLayer} />
                                        <LeftBottomSvg style={leftBottomLayer} />
                                        <RightSvg style={rightLayer} />
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
