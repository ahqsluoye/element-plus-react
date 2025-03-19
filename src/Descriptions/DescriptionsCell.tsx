import classNames from 'classnames';
import React, { createElement, memo, useContext, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { DescriptionsContext } from './DescriptionsContext';
import { DescriptionsItemProps } from './typings';

interface Props {
    cell: React.ReactElement<DescriptionsItemProps>;
    tag: string;
    type: string;
}

const DescriptionsCell = ({ cell, tag, type }: Props) => {
    const { label, span, align, labelAlign, className, labelClassName, width, minWidth, children } = cell.props;
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
                    style,
                    className: classNames(e`cell`, is({ [align]: align })),
                    colSpan: span,
                },
                [
                    createElement('span', { className: classNames(e`label`, labelClassName) }, label),
                    createElement('span', { className: classNames(e`content`, className) }, children),
                ],
            );
    }
};

DescriptionsCell.displayName = 'DescriptionsCell';

export default memo(DescriptionsCell);
