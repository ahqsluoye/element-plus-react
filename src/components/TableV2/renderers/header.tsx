import { HeaderRow, TableV2HeaderRendererParams } from '../components';
import { tryCall } from '../utils';

import { UseNamespaceReturn } from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { FC } from 'react';
import type { TableV2Props } from '../table';

type HeaderRendererProps = TableV2HeaderRendererParams &
    Pick<TableV2Props, 'headerClass' | 'headerProps' | 'headerFormatter' | 'cellFormatter'> & {
        ns: UseNamespaceReturn;
    };

const HeaderRenderer: FC<HeaderRendererProps> = ({
    columns,
    columnsStyles,
    headerIndex,
    style,
    // derived from root
    headerFormatter,
    cellFormatter,
    headerClass,
    headerProps,
    ns,
    children,
}) => {
    const param = { columns, headerIndex };

    const extraProps = {
        ...tryCall(headerProps, param),
        columnsStyles,
        className: classNames(ns.e('header-row'), tryCall(headerClass, param, ''), ns.is({ customized: Boolean(headerFormatter) })),
        columns,
        headerIndex,
        style,
        headerFormatter,
        cellFormatter,
    };

    return <HeaderRow {...extraProps}>{children}</HeaderRow>;
};

export default HeaderRenderer;
