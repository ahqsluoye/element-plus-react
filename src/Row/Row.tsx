import classNames from 'classnames';
import React, { FC } from 'react';
import { floatDivide } from '../Util';
import { useClassNames } from '../hooks';
import { RowContext } from './RowContext';
import { RowProps } from './typings';

const Row: FC<RowProps> = props => {
    const { tag = 'div', gutter = 0, justify, align, classPrefix = 'row' } = props;
    const { b, is } = useClassNames(classPrefix);

    return (
        <RowContext.Provider value={{ gutter }}>
            {React.createElement(
                tag,
                {
                    className: classNames(b(), is({ [`justify-${justify}`]: justify, [`align-${align}`]: align }), props.className),
                    style: {
                        ...(gutter > 0 ? { marginLeft: -floatDivide(gutter, 2), marginRight: floatDivide(gutter, 2) } : {}),
                        ...props.style,
                    },
                },
                props.children,
            )}
        </RowContext.Provider>
    );
};

Row.defaultProps = {
    gutter: 0,
    justify: 'start',
    tag: 'div',
};
export default Row;
