import { ElCarousel, ElCarouselItem } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const basic = () => {
    return (
        <div className="block text-center" style={{ height: 300 }}>
            <span className="demonstration">each carousel-item has a different height</span>
            <ElCarousel height="auto" autoplay>
                <ElCarouselItem style={{ height: 100 }}>
                    <h3 className="small justify-center">height 100px</h3>
                </ElCarouselItem>
                <ElCarouselItem style={{ height: 200 }}>
                    <h3 className="small justify-center">height 200px</h3>
                </ElCarouselItem>
                <ElCarouselItem style={{ height: 300 }}>
                    <h3 className="small justify-center">height 300px</h3>
                </ElCarouselItem>
            </ElCarousel>
        </div>
    );
};

export default basic;
