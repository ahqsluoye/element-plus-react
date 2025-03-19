import classNames from 'classnames';
import React, { createContext, FC, memo } from 'react';
import { useClassNames } from '../hooks';
import { BreadcrumbContextProps, BreadcrumbProps } from './typings';

const Breadcrumb: FC<BreadcrumbProps> = memo(props => {
    const { classPrefix = 'breadcrumb', separator } = props;
    const { b } = useClassNames(classPrefix);

    return (
        <BreadcrumbContext.Provider value={{ separator }}>
            <div className={classNames(b(), props.className)} style={props.style}>
                {props.children}
            </div>
        </BreadcrumbContext.Provider>
    );
});

Breadcrumb.defaultProps = {
    separator: '/',
};

export default Breadcrumb;

export const BreadcrumbContext = createContext<BreadcrumbContextProps>({
    separator: '/',
});
