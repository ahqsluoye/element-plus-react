import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { Children, ComponentType, useMemo } from 'react';
import { ContainerProps } from './typings';

const Container = ({ ref, ...props }: ContainerProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { direction, children } = props;
    const { b, is } = useClassNames('container');

    const isVertical = useMemo(() => {
        if (direction === 'vertical') {
            return true;
        } else if (direction === 'horizontal') {
            return false;
        }
        if (Children.count(children) > 0) {
            const vNodes = Children.toArray(children);
            return vNodes.some((node: React.ReactElement<any>) => {
                let nodeType = node?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                return nodeType === 'ElHeader' || nodeType === 'ElFooter';
            });
        } else {
            return false;
        }
    }, [children, direction]);

    return (
        <section className={classNames(b(), is({ vertical: isVertical }), props.className)} ref={ref} style={props.style}>
            {props.children}
        </section>
    );
};

Container.displayName = 'ElContainer';
export default Container;
