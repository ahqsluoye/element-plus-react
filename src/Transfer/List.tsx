import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Dropdown, DropdownItem, DropdownMenu } from '../Dropdown';
import { Icon } from '../Icon';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import DefaultListBody from './ListBody';
import Search from './search';
import { KeyWiseTransferItem } from './typings';
import { RenderedItem, TransferListProps } from './typings/list';
import { ListBodyRef, OmitProps, TransferListBodyProps } from './typings/listBody';

// const defaultRender = item => item.label;

// function isRenderResultPlainObject(result: RenderResult) {
//     return result && !isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]';
// }

type RecordType = KeyWiseTransferItem;

const TransferList: FC<TransferListProps<RecordType>> = props => {
    props = mergeDefaultProps(
        {
            data: [],
            titleText: '',
            showSearch: false,
            itemsUnit: '项',
            itemUnit: '项',
            searchPlaceholder: '请输入搜索内容',
        },
        props,
    );
    const {
        classPrefix = 'transfer-list',
        data,
        titleText,
        checkedKeys,
        disabled,
        footer,
        showSearch,
        style,
        searchPlaceholder,
        notFoundContent,
        renderList,
        onItemSelectAll,
        showSelectAll = true,
        pagination,
        direction,
        itemsUnit,
        itemUnit,
        selectAllLabel,
        filterOption,
        render,
        handleFilter,
        fieldNames,
    } = props;

    const { b } = useClassNames(classPrefix);
    const [filterValue, setFilterValue] = useState('');
    const defaultListBodyRef = useRef<ListBodyRef>();

    const getCheckStatus = useCallback(
        (filteredItems: RecordType[]) => {
            if (checkedKeys.length === 0) {
                return 'none';
            }
            if (filteredItems.every(item => checkedKeys.indexOf(item.key) >= 0 || !!item[fieldNames.disabled])) {
                return 'all';
            }
            return 'part';
        },
        [checkedKeys, fieldNames.disabled],
    );

    // =============================== Filter ===============================
    const onFilter = useCallback(
        e => {
            const {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                target: { value: filterValue },
            } = e;
            setFilterValue(filterValue);
            handleFilter?.(e);
        },
        [handleFilter],
    );

    const handleClear = useCallback(() => {
        setFilterValue('');
        handleClear();
    }, []);

    const matchFilter = useCallback(
        (text: string, item: RecordType) => {
            if (filterOption) {
                return filterOption(filterValue, item);
            }
            return text.indexOf(filterValue) >= 0;
        },
        [filterOption, filterValue],
    );

    // =============================== Render ===============================
    const renderListBody = useCallback(
        (options: TransferListBodyProps<RecordType>) => {
            let bodyContent: React.ReactElement = renderList?.(options);
            const customize = !!bodyContent;
            if (!customize) {
                bodyContent = <DefaultListBody /* ref={defaultListBodyRef} */ {...options} />;
            }
            return {
                customize,
                bodyContent,
            };
        },
        [renderList],
    );

    const renderItem = useCallback(
        (item: RecordType): RenderedItem<RecordType> => {
            return {
                renderedText: item[fieldNames.title],
                renderedEl: render?.(item) ?? item[fieldNames.title],
                item,
            };
        },
        [fieldNames.title, render],
    );

    const { filteredItems, filteredRenderItems } = useMemo<{ filteredItems: RecordType[]; filteredRenderItems: RenderedItem<RecordType>[] }>(() => {
        const _filteredItems: RecordType[] = [];
        const _filteredRenderItems: RenderedItem<RecordType>[] = [];

        data.forEach(item => {
            const renderedItem = renderItem(item);
            const { renderedText } = renderedItem;

            // Filter skip
            if (filterValue && !matchFilter(renderedText, item)) {
                return null;
            }

            _filteredItems.push(item);
            _filteredRenderItems.push(renderedItem);
        });

        return { filteredItems: _filteredItems, filteredRenderItems: _filteredRenderItems };
    }, [data, filterValue, matchFilter, renderItem]);

    const getEnabledItemKeys = useCallback(
        (items: RecordType[]) => {
            return items.filter(item => !item[fieldNames.disabled]).map(item => item.key);
        },
        [fieldNames.disabled],
    );

    const onDropdownClick = useCallback(
        (command: string) => {
            let keys, pageItems, availableKeys: string[], checkedKeySet, newCheckedKeys: string[], newUnCheckedKeys: string[];
            switch (command) {
                case 'selectAll':
                    keys = getEnabledItemKeys(filteredItems);
                    onItemSelectAll(keys, keys.length !== checkedKeys.length);
                    break;
                case 'pagination':
                    pageItems = defaultListBodyRef.current?.getItems || [];
                    onItemSelectAll(getEnabledItemKeys(pageItems.map(entity => entity.item)), true);
                    break;
                case 'selectInvert':
                    if (pagination) {
                        availableKeys = getEnabledItemKeys((defaultListBodyRef.current?.getItems || []).map(entity => entity.item));
                    } else {
                        availableKeys = getEnabledItemKeys(filteredItems);
                    }

                    checkedKeySet = new Set(checkedKeys);
                    newCheckedKeys = [];
                    newUnCheckedKeys = [];

                    availableKeys.forEach(item => {
                        if (checkedKeySet.has(item)) {
                            newUnCheckedKeys.push(item);
                        } else {
                            newCheckedKeys.push(item);
                        }
                    });

                    onItemSelectAll(newCheckedKeys, true, true);
                    // setTimeout(() => {
                    //     onItemSelectAll(newUnCheckedKeys, false);
                    // }, 0);
                    break;

                default:
                    break;
            }
        },
        [checkedKeys, filteredItems, getEnabledItemKeys, onItemSelectAll, pagination],
    );

    const getSelectAllLabel = useMemo(() => {
        const selectedCount: number = checkedKeys.length;
        const totalCount: number = filteredItems.length;
        if (selectAllLabel) {
            return typeof selectAllLabel === 'function' ? selectAllLabel?.({ selectedCount, totalCount }) : selectAllLabel;
        }
        const unit = totalCount > 1 ? itemsUnit : itemUnit;
        return (
            <>
                {(selectedCount > 0 ? `${selectedCount}/` : '') + totalCount} {unit}
            </>
        );
    }, [checkedKeys.length, filteredItems.length, itemUnit, itemsUnit, selectAllLabel]);

    // ================================= List Body =================================

    const listBody = useMemo<React.ReactElement>(() => {
        const search = showSearch ? (
            <div className={b`body-search-wrapper`}>
                <Search prefixCls={b`search`} onChange={onFilter} handleClear={handleClear} placeholder={searchPlaceholder} value={filterValue} disabled={disabled} />
            </div>
        ) : null;

        // @ts-ignore
        const { bodyContent, customize } = renderListBody({
            ...omit(props, OmitProps),
            filteredItems,
            filteredRenderItems,
            selectedKeys: checkedKeys,
        });

        const getNotFoundContent = () => {
            const contentIndex = props.direction === 'left' ? 0 : 1;
            return Array.isArray(notFoundContent) ? notFoundContent[contentIndex] : notFoundContent;
        };

        let bodyNode: React.ReactElement;
        // We should wrap customize list body in a classNamed div to use flex layout.
        if (customize) {
            bodyNode = <div className={b`body-customize-wrapper`}>{bodyContent}</div>;
        } else {
            bodyNode = filteredItems.length ? bodyContent : <div className={b`body-not-found`}>{getNotFoundContent()}</div>;
        }

        return (
            <div className={showSearch ? classNames(b`body`, b`body-with-search`) : b`body`}>
                {search}
                {bodyNode}
            </div>
        );
    }, [b, checkedKeys, disabled, filterValue, filteredItems, filteredRenderItems, handleClear, onFilter, notFoundContent, props, renderListBody, searchPlaceholder, showSearch]);

    // Custom Layout
    const footerDom = useMemo(() => footer && (footer.length < 2 ? footer(props) : footer(props, { direction })), [direction, footer, props]);

    // ================================ List Footer ================================
    const listFooter = useMemo(() => (footerDom ? <div className={b`footer`}>{footerDom}</div> : null), [b, footerDom]);

    const checkAllCheckbox = useMemo(() => {
        if (pagination) {
            return null;
        }
        const checkStatus = getCheckStatus(filteredItems);
        const checkedAll = checkStatus === 'all';
        const result = (
            <Checkbox
                disabled={disabled}
                checked={checkedAll}
                indeterminate={checkStatus === 'part'}
                className={b`checkbox`}
                onChange={() => {
                    // Only select enabled items
                    onItemSelectAll(
                        filteredItems.filter(item => !item[fieldNames.disabled]).map(({ key }) => key),
                        !checkedAll,
                    );
                }}
            >
                {titleText}
            </Checkbox>
        );

        return result;
    }, [b, disabled, fieldNames.disabled, filteredItems, getCheckStatus, onItemSelectAll, pagination, titleText]);

    const menu: React.ReactElement = useMemo(
        () => (
            <DropdownMenu>
                <DropdownItem key="selectAll" command="selectAll">
                    全选所有
                </DropdownItem>
                {pagination && (
                    <DropdownItem key="pagination" command="pagination">
                        全选当页
                    </DropdownItem>
                )}
                <DropdownItem key="selectInvert" command="selectInvert">
                    反选当页
                </DropdownItem>
            </DropdownMenu>
        ),
        [pagination],
    );

    const dropdown = (
        <Dropdown className={b`header-dropdown`} menu={menu} disabled={disabled} onClick={onDropdownClick}>
            <Icon name="angle-down" />
        </Dropdown>
    );

    return (
        <div className={classNames(b(), { [b`with-pagination`]: !!pagination, [b`with-footer`]: !!footerDom })} style={style}>
            {/* Header */}
            <div className={b`header`}>
                {showSelectAll ? (
                    <>
                        {checkAllCheckbox}
                        {dropdown}
                    </>
                ) : null}
                {/* <span className={b`header-selected`}/> */}
                <span className={b`header-title`}>
                    {getSelectAllLabel}
                    {/* {titleText} */}
                </span>
                {/* <span className={b`header-selected`}>{getSelectAllLabel(checkedKeys.length, filteredItems.length)}</span>
                    <span className={b`header-title`}>{titleText}</span> */}
            </div>

            {/* Body */}
            {listBody}

            {/* Footer */}
            {listFooter}
        </div>
    );
};

export default TransferList;
