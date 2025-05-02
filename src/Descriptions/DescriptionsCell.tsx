import classNames from 'classnames';
import React, { createElement, memo, useContext, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { DescriptionsContext } from './DescriptionsContext';
import { DescriptionsItemProps } from './typings';

interface Props {
    cell: React.ReactElement<DescriptionsItemProps>;
    tag: string;
    type: string;
    _key: string;
}

const DescriptionsCell = memo(({ cell, tag, type, _key }: Props) => {
    const { label, span = 1, align, labelAlign, className, labelClassName, width, minWidth, children } = cell.props;
    const { direction, border } = useContext(DescriptionsContext);
    const { e, is } = useClassNames('descriptions');

    const isVertical = useMemo(() => direction === 'vertical', [direction]);

    const style = useMemo(() => {
        return { width, minWidth };
    }, [minWidth, width]);

    switch (type) {
        case 'label':
            return createElement(
                tag,
                {
                    key: _key,
                    style,
                    className: classNames(e`cell`, e`label`, is({ 'bordered-label': border, 'vertical-label': isVertical, [labelAlign]: labelAlign }), labelClassName),
                    colSpan: isVertical ? span : 1,
                },
                label,
            );
        case 'content':
            return createElement(
                tag,
                {
                    key: _key,
                    style,
                    className: classNames(e`cell`, e`content`, is({ 'bordered-label': border, 'vertical-label': isVertical, [align]: align }), className),
                    colSpan: isVertical ? span : span * 2 - 1,
                },
                children,
            );
        default:
            return createElement(
                'td',
                {
                    key: _key,
                    style,
                    className: classNames(e`cell`, is({ [align]: align })),
                    colSpan: span,
                },
                [
                    createElement('span', { key: _key + '1', className: classNames(e`label`, labelClassName) }, label),
                    createElement('span', { key: _key + '2', className: classNames(e`content`, className) }, children),
                ],
            );
    }
});

DescriptionsCell.displayName = 'ElDescriptionsCell';

export default DescriptionsCell;
