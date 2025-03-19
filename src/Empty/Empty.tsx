import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { BaseProps, NativeProps } from '../types/common';
import ImgEmpty from './ImgEmpty';

export interface IEmptyProps extends BaseProps, NativeProps {
    image?: string;
    imageSize?: number;
    description?: string;
}

const Empty: FC<IEmptyProps> = props => {
    const { image, imageSize, description } = props;
    const { b, e } = useClassNames('empty');
    const imageStyle = useMemo(() => {
        return {
            width: imageSize ? imageSize : '',
        };
    }, [imageSize]);

    return (
        <div className={classNames(b(), props.className)}>
            <div className={e`image`} style={imageStyle}>
                {image ? (
                    <img
                        src="image"
                        onDragStart={() => {
                            return false;
                        }}
                    />
                ) : (
                    <ImgEmpty />
                )}
            </div>
            <div className={e`description`}>
                <p>{description}</p>
            </div>
            {props.children ? <div className={e`bottom`}>{props.children}</div> : null}
        </div>
    );
};

Empty.defaultProps = {
    description: '暂无数据',
};
Empty.displayName = 'Empty';

export default Empty;
