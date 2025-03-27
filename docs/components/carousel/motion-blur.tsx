import { ElCarousel, ElCarouselItem } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const basic = () => {
    return (
        <div className="block text-center">
            <span className="demonstration">Motion blur the switch (default)</span>
            <ElCarousel height={200} motionBlur>
                {new Array(4).fill(0).map((_, index) => (
                    <ElCarouselItem key={index}>
                        <h3 className="small justify-center">{index + 1}</h3>
                    </ElCarouselItem>
                ))}
            </ElCarousel>

            <p className="text-center demonstration">Vertical effect</p>
            <ElCarousel direction="vertical" height="200px" autoplay={false}>
                {new Array(4).fill(0).map((_, index) => (
                    <ElCarouselItem key={index}>
                        <h3 className="small justify-center">{index + 1}</h3>
                    </ElCarouselItem>
                ))}
            </ElCarousel>
        </div>
    );
};

export default basic;
