import classNames from 'classnames';
import React, { cloneElement, forwardRef, memo, useCallback, useMemo } from 'react';
import { useChildrenInstance, useClassNames } from '../hooks';
import { DescriptionsContext } from './DescriptionsContext';
import DescriptionsRow from './DescriptionsRow';
import { DescriptionsItemProps, DescriptionsProps } from './typings';

const Descriptions = forwardRef<any, DescriptionsProps>((props, ref) => {
    const { border, column, direction, title, size, extra, classPrefix = 'descriptions', className, style } = props;
    const { b, e, m, is } = useClassNames(classPrefix);

    /** 获取子组件 */
    const getChildInstance = useChildrenInstance<DescriptionsItemProps>('DescriptionsItem');

    const filledNode = useCallback((node: React.ReactElement<DescriptionsItemProps>, span: number, count: number, isLast = false): React.ReactElement<DescriptionsItemProps> => {
        if (span > count) {
            return cloneElement(node, {
                ...node.props,
                span: count,
            });
        }
        if (isLast) {
            // set the last span
            return cloneElement(node, {
                ...node.props,
                span: span,
            });
        }
        return node;
    }, []);

    /** 获取TabPane组件中的配置数据 */
    const rows = useMemo(() => {
        const children = getChildInstance(props.children);
        const result: React.ReactElement<DescriptionsItemProps>[][] = [];
        let temp: React.ReactElement<DescriptionsItemProps>[] = [];
        let count = column;
        let totalSpan = 0; // all spans number of item

        children.forEach((node, index) => {
            const span = node.props?.span || 1;

            if (index < children.length - 1) {
                totalSpan += span > count ? count : span;
            }

            if (index === children.length - 1) {
                // calculate the last item span
                const lastSpan = column - (totalSpan % column);
                temp.push(filledNode(node, lastSpan, count, true));
                result.push(temp);
                return;
            }

            if (span < count) {
                count -= span;
                temp.push(node);
            } else {
                temp.push(filledNode(node, span, count));
                result.push(temp);
                count = column;
                temp = [];
            }
        });

        return result;
    }, [getChildInstance, props.children, column, filledNode]);

    return (
        <div ref={ref} className={classNames(b(), { [m(size)]: size }, className)} style={style}>
            {(title || extra) && (
                <div className={e`header`}>
                    <div className={e`title`}>{title}</div>
                    <div className={e`extra`}>{extra}</div>
                </div>
            )}

            <DescriptionsContext.Provider value={{ direction, border }}>
                <div className={e`body`}>
                    <table className={classNames(e`table`, is({ bordered: border }))}>
                        <tbody>
                            {rows.map(row => (
                                <DescriptionsRow row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </DescriptionsContext.Provider>
        </div>
    );
});

Descriptions.displayName = 'Descriptions';
Descriptions.defaultProps = {
    column: 3,
    direction: 'horizontal',
};

export default memo(Descriptions);
