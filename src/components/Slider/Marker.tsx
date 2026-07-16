import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { SliderMarkerProps } from './typings';

const SliderMarker = memo<SliderMarkerProps>(props => {
    const { mark, style, onMousedown } = props;
    const { e } = useClassNames('slider');

    const label = useMemo(() => {
        return typeof mark === 'string' ? mark : mark?.label;
    }, [mark]);

    const markStyle = useMemo(() => {
        return typeof mark === 'string' ? undefined : mark?.style;
    }, [mark]);

    return (
        <div className={classNames(e`marks-text`)} style={{ ...style, ...markStyle }} onMouseDown={onMousedown}>
            {label}
        </div>
    );
});

SliderMarker.displayName = 'ElSliderMarker';

export default SliderMarker;
