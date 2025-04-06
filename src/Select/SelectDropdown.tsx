import classNames from 'classnames';
import trim from 'lodash/trim';
import React, { Children, ComponentType, cloneElement, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Divider } from '../Divider';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import Scrollbar from '../Scrollbar/Scrollbar';
import { isEmpty, isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import Option from './Option';
import { SelectContext } from './SelectContext';
import { SelectDropdownProps, SelectDropdownRef, SelectOptionGroupProps, SelectOptionProps } from './typings';

const SelectDropdown = forwardRef<SelectDropdownRef, SelectDropdownProps>((props, ref) => {
    const {
        value,
        filterable,
        multiple = false,
        filterMethod,
        loadingText,
        noMatchText,
        noDataText,
        searchInstance,
        createItem,
        setCreateItem,
        createInputRef,
        onChoose,
        popperInstRef,
        contentRef,
    } = props;
    const { b, e, be, is } = useClassNames('select');
    const ulRef = useRef<HTMLUListElement>(null);

    // 下拉项高亮
    const [hover, setHover] = useState(value);
    // 搜索关键词
    const [searchText, setSearchText] = useState('');

    /** 搜索时 */
    useEffect(() => {
        if (popperInstRef.current && popperInstRef.current.update) {
            popperInstRef.current?.update();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    /** 清除搜索关键词 */
    const onClearSearch = useCallback(event => {
        event?.stopPropagation();
        setSearchText('');
    }, []);

    /** 搜索 */
    const onSearch = useCallback(
        (val: string | number) => {
            const keywords = trim(val + '');
            if (keywords === searchText) {
                return;
            } else if (isEmpty(keywords)) {
                setSearchText('');
            }

            setSearchText(keywords);
        },
        [searchText],
    );

    const filterAction = useCallback(
        (p: SelectOptionProps) => {
            if (isNotEmpty(searchText) && isNotEmpty(p.value)) {
                if (filterMethod) {
                    const filterResult = filterMethod(p.label ?? p.value.toString(), searchText);
                    return filterResult;
                } else {
                    const regex = new RegExp(searchText, 'gi');
                    const res = null !== (p.label ?? p.value.toString()).match(regex);
                    return res;
                }
            } else {
                return true;
            }
        },
        [filterMethod, searchText],
    );

    const scrollToSelected = useCallback(() => {
        const node = ulRef.current?.querySelectorAll('.selected');
        if (node && node.length > 0) {
            scrollIntoView(node[0], {
                scrollMode: 'if-needed',
                block: 'center',
            });
        }
    }, []);

    useImperativeHandle(ref, () => ({
        clear: () => setSearchText(''),
        hover: setHover,
        scrollToSelected,
    }));

    const loading = useMemo(
        () => (
            <Option className="no-data" value="">
                {loadingText}
            </Option>
        ),
        [loadingText],
    );

    const options = useMemo(() => {
        // 搜索
        if (isNotEmpty(searchText)) {
            let match = false;
            return props.children ? (
                <>
                    {Children.toArray(props.children).map((item: React.ReactElement<SelectOptionGroupProps | SelectOptionProps>) => {
                        let nodeType = item?.type;
                        nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                        if (nodeType === 'Select.Option') {
                            if (filterAction((item as React.ReactElement<SelectOptionProps>).props)) {
                                match = true;
                                return item;
                            }
                        } else if (nodeType === 'OptionGroup') {
                            if (item.props.children) {
                                const matchChildren = Children.toArray((item as React.ReactElement<SelectOptionGroupProps>).props.children).filter(
                                    (item1: React.ReactElement<SelectOptionProps>) => {
                                        if (filterAction(item1.props)) {
                                            match = true;
                                            return item1;
                                        }
                                    },
                                );
                                return matchChildren.length > 0 ? cloneElement(item, item.props, matchChildren) : null;
                            } else {
                                return null;
                            }
                        }

                        // if (filterAction(item.props)) {
                        //     match = true;
                        //     return item;
                        // }
                    })}
                    {!match && (
                        <Option className="no-data" value="" key={'noMatchText'}>
                            {noMatchText}
                        </Option>
                    )}
                </>
            ) : null;
        }
        // 正在创建新的选项
        else if (isNotEmpty(createItem)) {
            // 单选时的创建项显示在下拉项里
            if (!multiple && value === createItem) {
                return (
                    <>
                        {createItem && !multiple && <Option value={createItem} label={createItem} />}
                        {props.children}
                    </>
                );
            }
            return (
                <Option
                    value={createItem}
                    label={createItem}
                    onClick={() => {
                        if (multiple) {
                            setCreateItem('');
                            if (createInputRef.current) {
                                createInputRef.current.value = '';
                            }
                        }
                    }}
                />
            );
        } else {
            if (Children.count(props.children) > 0) {
                return props.children;
            } else {
                return (
                    <Option className="no-data" value="">
                        {noDataText}
                    </Option>
                );
            }
        }
    }, [searchText, createItem, props.children, noMatchText, filterAction, multiple, value, setCreateItem, createInputRef, noDataText]);

    return (
        <div className={classNames(b`dorpdown`, is({ multiple }))} onClick={event => event.stopPropagation()} ref={contentRef}>
            <>
                {filterable && (
                    <div className={e`search`} onClick={event => event.stopPropagation()}>
                        <Input
                            ref={searchInstance}
                            placeholder="请输入关键词"
                            clearable
                            plain
                            debounceInput
                            onClear={onClearSearch}
                            onChange={onSearch}
                            prefix={<Icon prefix="fal" name="search" />}
                        />
                        <Divider style={{ margin: 0 }} />
                    </div>
                )}
                <SelectContext.Provider value={{ value, onChoose, hover, setHover, multiple }}>
                    <Scrollbar wrapClass={be('dropdown', 'wrap')}>
                        <ul className={be('dropdown', 'list')} ref={ulRef}>
                            {props.loading ? loading : options}
                        </ul>
                    </Scrollbar>
                </SelectContext.Provider>
            </>
        </div>
    );
});

export default SelectDropdown;
