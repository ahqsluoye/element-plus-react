import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import ImgEmpty from './ImgEmpty';

export interface IEmptyProps extends BaseProps, NativeProps {
    image?: string;
    imageSize?: number;
    description?: string;
}

const Empty: FC<IEmptyProps> = props => {
    const { t } = useLocale();
    props = mergeDefaultProps(
        {
            description: t('el.tree.emptyText'),
        },
        props,
    );
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

Empty.displayName = 'ElEmpty';

export default Empty;
