import classNames from 'classnames';
import React, { Children, ComponentType, cloneElement, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import Scrollbar from '../Scrollbar/Scrollbar';
import { isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import Option from './Option';
import { SelectContext } from './SelectContext';
import { SelectDropdownProps, SelectDropdownRef, SelectOptionGroupProps, SelectOptionProps } from './typings';

const SelectDropdown = forwardRef<SelectDropdownRef, SelectDropdownProps>((props, ref) => {
    const {
        value,
        filterable,
        allowCreate,
        multiple = false,
        filterMethod,
        remote = false,
        remoteMethod,
        loadingText,
        loadingIcon,
        noMatchText,
        noDataText,
        inputValue: searchText,
        setInputValue,
        onChoose,
        popperInstRef,
        contentRef,
        header,
        footer,
    } = props;
    const { b, e, be, is } = useClassNames('select');
    const ulRef = useRef<HTMLUListElement>(null);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    // 下拉项高亮
    const [hover, setHover] = useState(value);

    /** 搜索时 */
    useEffect(() => {
        if (popperInstRef.current && popperInstRef.current.update) {
            popperInstRef.current?.update();
        }
        if (filterable && remote) {
            remoteMethod?.(searchText);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    const filterAction = useCallback(
        (p: SelectOptionProps) => {
            if (isNotEmpty(searchText) && isNotEmpty(p.value)) {
                if (filterMethod) {
                    const filterResult = filterMethod(p.label ?? p.value.toString(), searchText);
                    return filterResult;
                } else {
                    const regex = new RegExp(searchText, 'gi');
                    const res = null !== `${p.label ?? p.value ?? ''}`.match(regex);
                    return res;
                }
            } else {
                return true;
            }
        },
        [filterMethod, searchText],
    );

    const scrollToSelected = useCallback(() => {
        // const node = ulRef.current?.querySelectorAll('.selected');
        // if (node && node.length > 0) {
        //     scrollIntoView(node[0], {
        //         scrollMode: 'if-needed',
        //         block: 'center',
        //     });
        // }
    }, []);

    // useEffect(() => {
    //     if (remoteSearch == '') {
    //         remoteMethod?.('');
    //     }
    // }, [remoteSearch]);

    useImperativeHandle(ref, () => ({
        clear: () => {
            remoteMethod?.('');
        },
        hover: setHover,
        scrollToSelected,
    }));

    const loading = useMemo(() => {
        if (loadingIcon) {
            return <div className={be('dropdown', 'loading')}>{loadingIcon}</div>;
        } else if (loadingText) {
            return <div className={be('dropdown', 'empty')}>{loadingText}</div>;
        }
    }, [be, loadingIcon, loadingText]);

    const options = useMemo(() => {
        // 正在创建新的选项
        if (filterable && allowCreate && isNotEmpty(searchText)) {
            // 单选时的创建项显示在下拉项里
            if (!multiple && value === searchText) {
                return (
                    <>
                        {searchText && !multiple && <Option value={searchText} label={searchText} />}
                        {props.children}
                    </>
                );
            }
            return (
                <Option
                    value={searchText}
                    label={searchText}
                    onClick={() => {
                        if (multiple) {
                            setInputValue('');
                        }
                    }}
                />
            );
        }
        // 搜索
        if (filterable && !remote && isNotEmpty(searchText)) {
            let match = false;
            return props.children ? (
                <>
                    {Children.toArray(props.children).map((item: React.ReactElement<SelectOptionGroupProps | SelectOptionProps>) => {
                        let nodeType = item?.type;
                        nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                        if (nodeType === 'ElOption') {
                            if (filterAction((item as React.ReactElement<SelectOptionProps>).props)) {
                                match = true;
                                return item;
                            }
                        } else if (nodeType === 'ElOptionGroup') {
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
                    {!match && <div className={be('dropdown', 'empty')}>{noMatchText}</div>}
                </>
            ) : null;
        } else {
            if (Children.count(props.children) > 0) {
                return props.children;
            } else {
                return <div className={be('dropdown', 'empty')}>{remote ? noMatchText : noDataText}</div>;
            }
        }
    }, [filterable, allowCreate, searchText, remote, multiple, value, props.children, setInputValue, noMatchText, filterAction, be, noDataText]);

    return (
        <div
            className={classNames(b`dorpdown`, is({ multiple }), { 'custom-header': header, 'custom-footer': footer })}
            onClick={event => event.stopPropagation()}
            ref={contentRef}
        >
            <>
                {header ? <div className={be('dropdown', 'header')}>{header}</div> : null}
                <SelectContext.Provider value={{ value, onChoose, hover, setHover, multiple }}>
                    <Scrollbar wrapClass={be('dropdown', 'wrap')} wrapStyle={{ display: props.loading ? 'none' : undefined }}>
                        <ul className={be('dropdown', 'list')} ref={ulRef}>
                            {options}
                        </ul>
                    </Scrollbar>
                    {props.loading ? loading : null}
                </SelectContext.Provider>
                {footer ? <div className={be('dropdown', 'footer')}>{footer}</div> : null}
            </>
        </div>
    );
});

export default SelectDropdown;
