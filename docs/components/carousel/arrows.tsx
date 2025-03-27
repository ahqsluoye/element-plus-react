import { ElCarousel, ElCarouselItem } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const basic = () => {
    return (
        <ElCarousel interval={5000} arrow="always">
            {new Array(6).fill(0).map((_, index) => (
                <ElCarouselItem key={index}>
                    <h3 className="small justify-center">{index + 1}</h3>
                </ElCarouselItem>
            ))}
        </ElCarousel>
    );
};

export default basic;
