import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Empty } from '../Empty';
import { mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import List from './List';
import Operation from './operation';
import { KeyWise, TransferDirection, TransferItem, TransferProps } from './typings';

type RecordType = TransferItem;

const Transfer: FC<TransferProps<RecordType>> = props => {
    // @ts-ignore
    props = mergeDefaultProps(
        {
            data: [],
            titles: ['Source', 'Target'],
            locale: {},
            filterable: false,
            listStyle: {},
        },
        props,
    );
    const {
        className,
        disabled,
        operations = [],
        filterable,
        footer,
        style,
        listStyle,
        operationStyle,
        filterMethod,
        render,
        children,
        showSelectAll,
        pagination,
        titles,
        data = [],
        selectedKeys,
        selectAllLabels = [],
        onChange,
        onScroll,
        classPrefix = 'transfer',
    } = props;
    const { b, is } = useClassNames(classPrefix);

    const fieldNames = useMemo(() => {
        return { key: 'key', title: 'label', disabled: 'disabled', ...props.fieldNames };
    }, [props.fieldNames]);

    const [value, setValue] = useControlled(props.value, props.defaultValue ?? []);
    const [sourceSelectedKeys, setSourceSelectedKeys] = useState(selectedKeys?.filter(key => data.some(item => item[fieldNames.key] === key) && !value.includes(key)) ?? []);
    const [targetSelectedKeys, setTargetSelectedKeys] = useState(selectedKeys?.filter(key => value.includes(key)) ?? []);

    useEffect(() => {
        if (selectedKeys) {
            const mergedTargetKeys = value || [];
            setSourceSelectedKeys(selectedKeys.filter(key => data.some(item => item[fieldNames.key] === key) && !mergedTargetKeys.includes(key)));
            setTargetSelectedKeys(selectedKeys.filter(key => mergedTargetKeys.includes(key)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeys]);

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
        [sourceSelectedKeys, targetSelectedKeys],
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
            handleSelectChange(direction, holder);

            if (!props.selectedKeys) {
                setStateKeys(direction, holder);
            }
        },
        [handleSelectChange, props.selectedKeys, setStateKeys, sourceSelectedKeys, targetSelectedKeys],
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
                handleClear={handleLeftClear}
                onItemSelect={onLeftItemSelect}
                onItemSelectAll={onLeftItemSelectAll}
                render={render}
                showSearch={filterable}
                renderList={children}
                footer={footer}
                onScroll={handleLeftScroll}
                disabled={disabled}
                direction={'left'}
                showSelectAll={showSelectAll}
                selectAllLabel={selectAllLabels[0]}
                pagination={mergedPagination}
                notFoundContent={<Empty imageSize={50} />}
                fieldNames={fieldNames}
                // {...omit(props, ['data', 'onScroll'])}
            />
            <Operation
                className={b`operation`}
                rightActive={sourceSelectedKeys.length > 0}
                rightArrowText={operations[0]}
                moveToRight={moveToRight}
                leftActive={targetSelectedKeys.length > 0}
                leftArrowText={operations[1]}
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
                handleClear={handleRightClear}
                onItemSelect={onRightItemSelect}
                onItemSelectAll={onRightItemSelectAll}
                onItemRemove={onRightItemRemove}
                render={render}
                showSearch={filterable}
                renderList={children}
                footer={footer}
                onScroll={handleRightScroll}
                disabled={disabled}
                direction={'right'}
                showSelectAll={showSelectAll}
                selectAllLabel={selectAllLabels[1]}
                pagination={mergedPagination}
                notFoundContent={<Empty imageSize={50} />}
                fieldNames={fieldNames}
                // {...omit(props, ['data', 'onScroll'])}
                // {...locale}
            />
        </div>
    );
};

Transfer.displayName = 'Transfer';

export default Transfer;
