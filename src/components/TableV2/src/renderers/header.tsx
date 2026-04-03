import { HeaderRow, TableV2HeaderRendererParams } from '../components';
import { tryCall } from '../utils';

import { UseNamespaceReturn } from '@qsxy/element-plus-react/hooks/useClassNames';
import React, { FC } from 'react';
import type { TableV2Props } from '../table';

type HeaderRendererProps = TableV2HeaderRendererParams &
    Pick<TableV2Props, 'headerClass' | 'headerProps' | 'headerFormatter'> & {
        ns: UseNamespaceReturn;
    };

const HeaderRenderer: FC<HeaderRendererProps> = ({
    columns,
    columnsStyles,
    headerIndex,
    style,
    // derived from root
    headerFormatter,
    headerClass,
    headerProps,
    ns,
    children,
}) => {
    const param = { columns, headerIndex };

    const kls = [ns.e('header-row'), tryCall(headerClass, param, ''), ns.is('customized', Boolean(headerFormatter))];

    const extraProps = {
        ...tryCall(headerProps, param),
        columnsStyles,
        class: kls,
        columns,
        headerIndex,
        style,
    };

    return <HeaderRow {...extraProps}>{children}</HeaderRow>;
};

export default HeaderRenderer;
