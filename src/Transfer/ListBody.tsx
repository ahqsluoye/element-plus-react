import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Pagination } from '../Pagination';
import { Scrollbar } from '../Scrollbar';
import { useClassNames } from '../hooks';
import ListItem from './ListItem';
import { PaginationType } from './interface';
import { KeyWiseTransferItem } from './typings';
import { RenderedItem } from './typings/list';
import { TransferListBodyProps } from './typings/listBody';

function parsePagination(pagination?: PaginationType) {
    if (!pagination) {
        return null;
    }

    const defaultPagination = {
        pageSize: 10,
    };

    if (typeof pagination === 'object') {
        return {
            ...defaultPagination,
            ...pagination,
        };
    }

    return defaultPagination;
}

type RecordType = KeyWiseTransferItem;

const ListBody: FC<TransferListBodyProps<RecordType>> = props => {
    const { classPrefix = 'transfer-list', onScroll, filteredRenderItems, selectedKeys, disabled: globalDisabled, pagination, onItemSelect, onItemRemove, fieldNames } = props;
    const { b } = useClassNames(classPrefix);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        const mergedPagination = parsePagination(pagination);
        if (mergedPagination) {
            // Calculate the page number
            const maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize);

            if (current > maxPageCount) {
                setCurrent(maxPageCount);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, pagination]);

    const handleItemSelect = useCallback(
        (item: RecordType) => {
            const checked = selectedKeys.indexOf(item[fieldNames.key]) >= 0;
            onItemSelect(item[fieldNames.key], !checked);
        },
        [fieldNames.key, onItemSelect, selectedKeys],
    );

    const handleItemRemove = useCallback(
        (item: RecordType) => {
            onItemRemove?.([item[fieldNames.key]]);
        },
        [fieldNames.key, onItemRemove],
    );

    const onPageChange = useCallback((cur: number) => {
        setCurrent(cur);
    }, []);

    const getItems = useMemo(() => {
        const mergedPagination = parsePagination(pagination);

        let displayItems = filteredRenderItems;

        if (mergedPagination) {
            displayItems = filteredRenderItems.slice((current - 1) * mergedPagination.pageSize, current * mergedPagination.pageSize);
        }

        return displayItems;
    }, [current, filteredRenderItems, pagination]);

    const mergedPagination = parsePagination(pagination);
    const paginationNode: React.ReactElement = useMemo(() => {
        if (mergedPagination) {
            return (
                <Pagination
                    simple
                    size="small"
                    disabled={globalDisabled}
                    className={b`pagination`}
                    total={filteredRenderItems.length}
                    pageSize={mergedPagination.pageSize}
                    current={current}
                    onChange={onPageChange}
                />
            );
        }
    }, [b, current, filteredRenderItems.length, globalDisabled, mergedPagination, onPageChange]);

    return (
        <>
            <Scrollbar>
                <ul className={classNames(b`content`, {})} onScroll={onScroll}>
                    {getItems.map(({ renderedEl, renderedText, item }: RenderedItem<RecordType>) => {
                        const checked = selectedKeys.indexOf(item.key) >= 0;

                        return (
                            <ListItem
                                disabled={globalDisabled || item[fieldNames.disabled]}
                                key={item.key}
                                item={item}
                                renderedText={renderedText}
                                renderedEl={renderedEl}
                                checked={checked}
                                prefixCls={b()}
                                onClick={handleItemSelect}
                                onRemove={handleItemRemove}
                                fieldNames={fieldNames}
                            />
                        );
                    })}
                </ul>
            </Scrollbar>

            {paginationNode}
        </>
    );
};

export default ListBody;
