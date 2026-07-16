import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import List from './List';
import Operation from './operation';
import { KeyWise, TransferDataItem, TransferDirection, TransferProps } from './typings';

type RecordType = TransferDataItem;

const Transfer: FC<TransferProps<RecordType>> = props => {
    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    props = mergeDefaultProps(
        {
            data: [],
            titles: [t('el.transfer.titles.0', { lng: locale }), t('el.transfer.titles.1', { lng: locale })],
            filterable: false,
            listStyle: {},
            leftDefaultChecked: [],
            rightDefaultChecked: [],
            leftEmpty: t('el.transfer.noData', { lng: locale }),
            rightEmpty: t('el.transfer.noData', { lng: locale }),
            filterPlaceholder: t('el.transfer.filterPlaceholder', { lng: locale }),
        },
        props,
    );
    const {
        className,
        disabled,
        buttonTexts: operations = [],
        filterable,
        leftFooter,
        rightFooter,
        style,
        listStyle,
        operationStyle,
        filterMethod,
        filterPlaceholder,
        renderContent,
        children,
        showSelectAll,
        pagination,
        titles,
        data = [],
        leftDefaultChecked,
        rightDefaultChecked,
        format,
        onChange,
        onScroll,
        onLeftCheckChange,
        onRightCheckChange,
        leftEmpty,
        rightEmpty,
        classPrefix = 'transfer',
    } = props;
    const { b, is } = useClassNames(classPrefix);

    const fieldNames = useMemo(() => {
        return { key: 'key', label: 'label', disabled: 'disabled', ...props.props };
    }, [props.props]);

    const [value, setValue] = useControlled(props.value, props.defaultValue ?? []);
    const [sourceSelectedKeys, setSourceSelectedKeys] = useControlled(undefined, leftDefaultChecked);
    const [targetSelectedKeys, setTargetSelectedKeys] = useControlled(undefined, rightDefaultChecked);

    // useEffect(() => {
    //     if (leftDefaultChecked) {
    //         setSourceSelectedKeys(leftDefaultChecked);
    //     }
    //     if (rightDefaultChecked) {
    //         setTargetSelectedKeys(rightDefaultChecked);
    //     }
    // }, [leftDefaultChecked, rightDefaultChecked]);

    const mergedPagination = useMemo(() => !children && pagination, [children, pagination]);

    const separateDataSource = useMemo(() => {
        const leftDataSource: KeyWise<RecordType>[] = [];
        const rightDataSource: KeyWise<RecordType>[] = new Array(value.length);
        data.forEach((item: KeyWise<RecordType>) => {
            if (!item.key) {
                item = {
                    ...item,
                    key: item[fieldNames.key],
                };
            }

            // rightDataSource should be ordered by targetKeys
            // leftDataSource should be ordered by data
            const indexOfKey = value.indexOf(item.key);
            if (indexOfKey !== -1) {
                rightDataSource[indexOfKey] = item;
            } else {
                leftDataSource.push(item);
            }
        });

        return {
            leftDataSource,
            rightDataSource,
        };
    }, [data, fieldNames.key, value]);

    const handleListStyle = useCallback((_listStyle: TransferProps<RecordType>['listStyle'], direction: TransferDirection): React.CSSProperties => {
        if (typeof _listStyle === 'function') {
            return _listStyle({ direction });
        }
        return _listStyle;
    }, []);

    const setStateKeys = useCallback(
        (direction: TransferDirection, keys: (string | number)[] | ((prevKeys: (string | number)[]) => (string | number)[])) => {
            if (direction === 'left') {
                const result = typeof keys === 'function' ? keys(sourceSelectedKeys || []) : keys;
                setSourceSelectedKeys(result);
                return;
            } else {
                setTargetSelectedKeys(typeof keys === 'function' ? keys(targetSelectedKeys || []) : keys);
            }
        },
        [setSourceSelectedKeys, setTargetSelectedKeys, sourceSelectedKeys, targetSelectedKeys],
    );

    const handleSelectChange = useCallback(
        (direction: TransferDirection, holder: (string | number)[]) => {
            const { onSelectChange } = props;
            // if (!onSelectChange) {
            //     return;
            // }

            if (direction === 'left') {
                onSelectChange?.(holder, targetSelectedKeys);
            } else {
                onSelectChange?.(sourceSelectedKeys, holder);
            }
        },
        [props, sourceSelectedKeys, targetSelectedKeys],
    );

    const moveTo = useCallback(
        (direction: TransferDirection) => {
            const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
            // filter the disabled options
            const newMoveKeys = moveKeys.filter((key: string) => !data.some(_data => !!(key === _data[fieldNames.key] && _data[fieldNames.disabled])));
            // move items to target box
            const newTargetKeys = direction === 'right' ? newMoveKeys.concat(value) : value.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);

            // empty checked keys
            const oppositeDirection = direction === 'right' ? 'left' : 'right';
            setStateKeys(oppositeDirection, []);
            handleSelectChange(oppositeDirection, []);

            setValue(newTargetKeys);
            onChange?.(newTargetKeys, direction, newMoveKeys);
        },
        [sourceSelectedKeys, targetSelectedKeys, value, setStateKeys, handleSelectChange, setValue, onChange, data, fieldNames.key, fieldNames.disabled],
    );

    const moveToLeft = useCallback(() => moveTo('left'), [moveTo]);

    const moveToRight = useCallback(() => moveTo('right'), [moveTo]);

    /**
     *
     * @param direction 方向
     * @param _selectedKeys 传入的keys
     * @param check 是否选中
     * @param overWrite 是否忽略check参数，直接使用_selectedKeys
     */
    const onItemSelectAll = useCallback(
        (direction: TransferDirection, _selectedKeys: string[], check: boolean, overWrite?: boolean) => {
            setStateKeys(direction, prevKeys => {
                let mergedCheckedKeys = [];
                if (overWrite) {
                    mergedCheckedKeys = _selectedKeys;
                } else {
                    if (check) {
                        // Merge current keys with origin key
                        mergedCheckedKeys = Array.from(new Set([...prevKeys, ..._selectedKeys]));
                    } else {
                        // Remove current keys from origin keys
                        mergedCheckedKeys = prevKeys.filter((key: string) => _selectedKeys.indexOf(key) === -1);
                    }
                }

                handleSelectChange(direction, mergedCheckedKeys);

                return mergedCheckedKeys;
            });
        },
        [handleSelectChange, setStateKeys],
    );

    const onLeftItemSelectAll = useCallback(
        (_selectedKeys: string[], checkAll: boolean, overWrite?: boolean) => onItemSelectAll('left', _selectedKeys, checkAll, overWrite),
        [onItemSelectAll],
    );

    const onRightItemSelectAll = useCallback(
        (_selectedKeys: string[], checkAll: boolean, overWrite?: boolean) => onItemSelectAll('right', _selectedKeys, checkAll, overWrite),
        [onItemSelectAll],
    );

    const handleFilter = useCallback(
        (direction: TransferDirection, e) => {
            const { onSearch } = props;
            onSearch?.(direction, e.target.value);
        },
        [props],
    );

    const handleLeftFilter = useCallback(e => handleFilter('left', e), [handleFilter]);

    const handleRightFilter = useCallback(e => handleFilter('right', e), [handleFilter]);

    const handleClear = useCallback(
        (direction: TransferDirection) => {
            const { onSearch } = props;
            onSearch?.(direction, '');
        },
        [props],
    );

    const handleLeftClear = useCallback(() => handleClear('left'), [handleClear]);

    const handleRightClear = useCallback(() => handleClear('right'), [handleClear]);

    const onItemSelect = useCallback(
        (direction: TransferDirection, selectedKey: string, checked: boolean) => {
            const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
            const index = holder.indexOf(selectedKey);
            if (index > -1) {
                holder.splice(index, 1);
            }
            if (checked) {
                holder.push(selectedKey);
            }
            if (direction === 'left') {
                onLeftCheckChange?.(holder, [selectedKey]);
            } else {
                onRightCheckChange?.(holder, [selectedKey]);
            }
            handleSelectChange(direction, holder);

            setStateKeys(direction, holder);
        },
        [handleSelectChange, onLeftCheckChange, onRightCheckChange, setStateKeys, sourceSelectedKeys, targetSelectedKeys],
    );

    const onLeftItemSelect = useCallback((selectedKey: string, checked: boolean) => onItemSelect('left', selectedKey, checked), [onItemSelect]);

    const onRightItemSelect = useCallback((selectedKey: string, checked: boolean) => onItemSelect('right', selectedKey, checked), [onItemSelect]);

    const onRightItemRemove = useCallback(
        (_selectedKeys: (string | number)[]) => {
            setStateKeys('right', []);

            setValue(value.filter(key => !_selectedKeys.includes(key)));
            onChange?.(
                value.filter(key => !_selectedKeys.includes(key)),
                'left',
                [..._selectedKeys],
            );
        },
        [onChange, setStateKeys, setValue, value],
    );

    const handleScroll = useCallback(
        (direction: TransferDirection, e) => {
            onScroll?.(direction, e);
        },
        [onScroll],
    );

    const handleLeftScroll = useCallback(e => handleScroll('left', e), [handleScroll]);

    const handleRightScroll = useCallback(e => handleScroll('right', e), [handleScroll]);

    return (
        <div className={classNames(b(), { [b`customize-list`]: !!children }, is({ disabled }), className)} style={style}>
            <List
                titleText={titles[0]}
                data={separateDataSource.leftDataSource}
                filterOption={filterMethod}
                style={handleListStyle(listStyle, 'left')}
                checkedKeys={sourceSelectedKeys}
                handleFilter={handleLeftFilter}
                handleClearSearch={handleLeftClear}
                onItemSelect={onLeftItemSelect}
                onItemSelectAll={onLeftItemSelectAll}
                renderContent={renderContent}
                showSearch={filterable}
                renderList={children}
                footer={leftFooter}
                onScroll={handleLeftScroll}
                disabled={disabled}
                direction={'left'}
                showSelectAll={showSelectAll}
                format={format}
                pagination={mergedPagination}
                notFoundContent={leftEmpty}
                fieldNames={fieldNames}
                filterPlaceholder={filterPlaceholder}
                // {...omit(props, ['data', 'onScroll'])}
            />
            <Operation
                className={b`operation`}
                rightActive={sourceSelectedKeys.length > 0}
                rightArrowText={operations[1]}
                moveToRight={moveToRight}
                leftActive={targetSelectedKeys.length > 0}
                leftArrowText={operations[0]}
                moveToLeft={moveToLeft}
                style={operationStyle}
                disabled={disabled}
            />
            <List
                titleText={titles[1]}
                data={separateDataSource.rightDataSource}
                filterOption={filterMethod}
                style={handleListStyle(listStyle, 'right')}
                checkedKeys={targetSelectedKeys}
                handleFilter={handleRightFilter}
                handleClearSearch={handleRightClear}
                onItemSelect={onRightItemSelect}
                onItemSelectAll={onRightItemSelectAll}
                onItemRemove={onRightItemRemove}
                renderContent={renderContent}
                showSearch={filterable}
                renderList={children}
                footer={rightFooter}
                onScroll={handleRightScroll}
                disabled={disabled}
                direction={'right'}
                showSelectAll={showSelectAll}
                format={format}
                pagination={mergedPagination}
                notFoundContent={rightEmpty}
                fieldNames={fieldNames}
                filterPlaceholder={filterPlaceholder}
                // {...omit(props, ['data', 'onScroll'])}
            />
        </div>
    );
};

Transfer.displayName = 'ElTransfer';

export default Transfer;
