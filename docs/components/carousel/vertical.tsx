import { ElCarousel, ElCarouselItem } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const basic = () => {
    return (
        <div>
            <p className="text-center demonstration">normal vertical layout</p>
            <ElCarousel height={200} direction="vertical" autoplay={false}>
                {new Array(4).fill(0).map((_, index) => (
                    <ElCarouselItem key={index}>
                        <h3 className="small justify-center">{index + 1}</h3>
                    </ElCarouselItem>
                ))}
            </ElCarousel>

            <p className="text-center demonstration">card vertical layout</p>
            <ElCarousel direction="vertical" type="card" height="400px" autoplay={false}>
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
