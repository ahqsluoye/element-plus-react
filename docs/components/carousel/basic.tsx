import { ElCarousel, ElCarouselItem } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const basic = () => {
    return (
        <div className="block text-center">
            <span className="demonstration">Switch when indicator is hovered (default)</span>
            <ElCarousel height={150}>
                {new Array(4).fill(0).map((_, index) => (
                    <ElCarouselItem key={index}>
                        <h3 className="small justify-center">{index + 1}</h3>
                    </ElCarouselItem>
                ))}
            </ElCarousel>

            <div className="block text-center">
                <span className="demonstration">Switch when indicator is clicked</span>
                <ElCarousel trigger="click" height="150px">
                    {new Array(4).fill(0).map((_, index) => (
                        <ElCarouselItem key={index}>
                            <h3 className="small justify-center">{index + 1}</h3>
                        </ElCarouselItem>
                    ))}
                </ElCarousel>
            </div>
        </div>
    );
};

export default basic;
