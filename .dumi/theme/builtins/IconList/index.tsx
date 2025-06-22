import {
    ElDialog,
    ElEmpty,
    ElIcon,
    ElInput,
    ElMessage,
    ElOption,
    ElPagination,
    ElScrollbar,
    ElSelect,
    ElTooltip,
    IconName,
    IconPrefix,
    ScrollbarRef,
    isEmpty,
} from '@qsxy/element-plus-react';
import classNames from 'classnames';
import clipboardCopy from 'clipboard-copy';
import { cloneDeep, debounce, filter, get, keys, some, trim } from 'lodash';
import Prism from 'prismjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { R_FAB_ICONS, R_ICONS } from './config.icons';
import { getIconPrefix, isFabIcon } from './dom';
import { ALL_ICONS as ICONS } from './icons';
import './style.scss';

const IconList = () => {
    const [active, setActive] = useState('ALL');
    const [activeType, setActiveType] = useState<IconPrefix>('far');
    const [activeSubType, setActiveSubType] = useState<IconPrefix>(activeType);
    const searchText = useRef('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [searchType, setSearchType] = useState('1');
    const [height, setHeight] = useState(800);

    const all = useRef(keys(ICONS));
    const scrollbarInstance = useRef<ScrollbarRef>(null);

    const allIconsByType = useMemo(() => {
        if (activeType === 'fab') {
            return R_FAB_ICONS;
        } else {
            return all.current.filter(item => !isFabIcon(item));
        }
    }, [activeType]);

    const list: any[] = useMemo(() => {
        return (active === 'ALL' ? allIconsByType : R_ICONS[active].icons)
            .filter(item => {
                return (activeType === 'fab' && isFabIcon(item)) || (activeType !== 'fab' && !isFabIcon(item));
            })
            .map(item => {
                const prefix = getIconPrefix(item);
                return {
                    prefix: prefix === 'fab' ? prefix : activeType,
                    name: item,
                    terms: get(ICONS, `${item}.search.terms`, []),
                    unicode: get(ICONS, `${item}.unicode`, ''),
                    label: get(ICONS, `${item}.label`, ''),
                };
            });
    }, [active, activeType, allIconsByType]);

    const [self, setSelf] = useState(list);
    const [pageNum, setPageNum] = useState(1);

    const [focusIcon, setFocusIcon] = useState<{
        prefix: IconPrefix;
        name: IconName;
        pre: string;
        svg: string;
        unicode: string;
    }>({
        // @ts-ignore
        prefix: 'far',
        name: '',
        pre: '',
        svg: '',
        unicode: '',
    });

    const typeList: { type: IconPrefix; label: string }[] = useMemo(
        () => [
            { type: 'fas', label: '粗体' },
            { type: 'far', label: '常规' },
            { type: 'fal', label: '细体' },
            { type: 'fat', label: '超细体' },
            { type: 'fad', label: '双色' },
            { type: 'fab', label: '商标' },
        ],
        [],
    );

    const catagories = useRef(
        keys(R_ICONS).map(item => {
            return {
                key: item,
                label: R_ICONS[item].label,
            };
        }),
    );

    const onSearch = useCallback(() => {
        const keywords = trim(searchText.current);
        if (isEmpty(keywords)) {
            setSelf(cloneDeep(list));
        } else {
            try {
                const regex = new RegExp(keywords, 'gi');
                if (searchType === '1') {
                    setSelf(
                        filter(list, item => {
                            return (
                                null !== item.name.match(regex) ||
                                some(item.terms, item1 => {
                                    return null !== item1.match(regex);
                                })
                            );
                        }),
                    );
                } else if (searchType === '2') {
                    setSelf(
                        list.filter(item => {
                            return null !== item.unicode.match(regex);
                        }),
                    );
                } else if (searchType === '3') {
                    setSelf(
                        list.filter(item => {
                            return null !== item.label.match(regex);
                        }),
                    );
                }
            } catch (error) {
                setSelf([]);
            }
        }
    }, [list, searchText, searchType]);

    const activeItem = useCallback(val => {
        setActive(val);

        // setSelf(
        //     (val === 'ALL' ? allIconsByType : R_ICONS[val].icons)
        //         .filter(item => {
        //             return (activeType === 'fab' && isFabIcon(item)) || (activeType !== 'fab' && !isFabIcon(item));
        //         })
        //         .map(item => {
        //             const prefix = getIconPrefix(item);
        //             return {
        //                 prefix: prefix === 'fab' ? prefix : activeType,
        //                 name: item,
        //             };
        //         }),
        // );
    }, []);

    const showDetail = useCallback(
        icon => {
            setDialogTitle(icon.name);
            setDialogVisible(true);
            setFocusIcon({
                ...focusIcon,
                prefix: icon.prefix,
                name: icon.name,
                pre: Prism.highlight(`<ElIcon name="${icon.name}" prefix="${icon.prefix}" />`, Prism.languages.tsx, 'tsx'),
                unicode: '\\' + get(ICONS, `${icon.name}.unicode`, ''),
                svg: get(ICONS, `${icon.name}.svg`, {}),
            });
        },
        [focusIcon],
    );

    const onCopy = useCallback(
        type => {
            let content = '';
            if (type === 'unicode') {
                content = focusIcon.unicode;
            } else if (type === 'jsx') {
                content = `<ElIcon name="${focusIcon.name}" prefix="${focusIcon.prefix}" />`;
            } else if (type === 'name') {
                content = focusIcon.name;
            } else if (type === 'svg') {
                const p = (() => {
                    switch (activeSubType) {
                        case 'fas':
                            return 'solid';
                        case 'far':
                            return 'regular';
                        case 'fal':
                            return 'ligth';
                        case 'fat':
                            return 'thin';
                        case 'fad':
                            return 'duotone';
                        case 'fab':
                            return 'brands';
                    }
                })();
                content = focusIcon.svg[p].raw;
            }
            const res = clipboardCopy(content);

            res.then(() => {
                ElMessage({
                    message: '已复制！',
                    type: 'success',
                });
            }).catch(() => {
                ElMessage({
                    message: '该浏览器不支持自动复制！',
                    type: 'error',
                });
            });
        },
        [activeSubType, focusIcon.name, focusIcon.prefix, focusIcon.svg, focusIcon.unicode],
    );

    const onChangeIconType = useCallback(type => {
        setActiveType(type);
        setActiveSubType(type);
    }, []);

    const onInput = useCallback(value => {
        searchText.current = value;
    }, []);

    const onChangeType = useCallback(
        value => {
            setSearchType(value);
            onSearch();
        },
        [onSearch],
    );

    const onChangeSubType = useCallback(
        type => {
            setActiveSubType(type);
            Object.assign(focusIcon, {
                prefix: type,
                pre: Prism.highlight(`<ElIcon name="${focusIcon.name}" prefix="${focusIcon.prefix}" />`, Prism.languages.tsx, 'tsx'),
            });
        },
        [focusIcon],
    );

    const onClear = useCallback(() => {
        searchText.current = '';
        setSelf(cloneDeep(list));
    }, [list]);

    useEffect(() => {
        const fn = debounce(() => {
            setHeight(window.innerHeight - 330);
            scrollbarInstance.current?.update();
        }, 200);

        fn();

        window.addEventListener('resize', fn);

        return () => {
            window.removeEventListener('resize', fn);
        };
    }, []);

    useEffect(() => {
        onSearch();
    }, [activeType, onSearch]);

    return (
        <>
            <div style={{ marginTop: -60 }}>
                <div className="r-icons-search-container">
                    <ElInput
                        placeholder="请输入关键词，按Enter键搜索"
                        prefix-icon="el-icon-search"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                onSearch();
                            }
                        }}
                        onChange={onInput}
                        onClear={onClear}
                        prepend={
                            <ElSelect value={searchType} placeholder="请选择" style={{ width: 130 }} onChange={onChangeType} clearable={false}>
                                <ElOption label="关键词" value="1"></ElOption>
                                <ElOption label="Unicode" value="2"></ElOption>
                                <ElOption label="名称" value="3"></ElOption>
                            </ElSelect>
                        }
                    />

                    <div className="r-style-buttons">
                        {typeList.map(item => {
                            return (
                                <div
                                    key={item.type}
                                    className={classNames('r-style-button-item', { active: activeType === item.type })}
                                    onClick={() => onChangeIconType(item.type)}
                                >
                                    <ElIcon prefix={item.type} name={item.type === 'fab' ? 'fa-font-awesome' : 'fa-icons'} />
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="r-icons-container" style={{ height: 'calc(100vh - 300px)' }}>
                    <div className="r-left">
                        <div className="r-title">图标分类</div>
                        <ul className="r-icon-ul">
                            <ElScrollbar ref={scrollbarInstance}>
                                <li className="r-icon-li" onClick={() => activeItem('ALL')}>
                                    <a className="r-icon-category">所有</a>
                                </li>
                                {catagories.current.map(item => {
                                    return (
                                        <li
                                            key={item.key}
                                            className={classNames('r-icon-li', { active: active === item.key })}
                                            onClick={() => {
                                                activeItem(item.key);
                                                setPageNum(1);
                                            }}
                                        >
                                            <a className="r-icon-category">{item.label}</a>
                                        </li>
                                    );
                                })}
                            </ElScrollbar>
                        </ul>
                    </div>
                    <div className="r-right">
                        {self.length === 0 ? (
                            <ElEmpty description="未搜索到匹配的图标！"></ElEmpty>
                        ) : (
                            <ElScrollbar>
                                <div className="r-icon-display-area">
                                    {self.slice((pageNum - 1) * 50, pageNum * 50).map((item, index) => {
                                        return (
                                            <div key={index} className="r-wrap-icon" onClick={() => showDetail(item)}>
                                                <ElIcon name={item.name} size="2x" prefix={activeType} />
                                                <p className="r-icon-text" title={item.name}>
                                                    {item.name}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ float: 'right', marginTop: 10 }}>
                                    <ElPagination
                                        total={self.length}
                                        pageSize={50}
                                        showSizeChanger={false}
                                        currentPage={pageNum}
                                        onChange={current => setPageNum(current)}
                                        showTotal={total => `共${total}个图标`}
                                    />
                                </div>
                            </ElScrollbar>
                        )}
                    </div>
                </div>
            </div>

            <ElDialog visible={dialogVisible} title={dialogTitle} close={() => setDialogVisible(false)}>
                <ElDialog.body>
                    <div className="r-style-switcher">
                        {activeSubType === 'fab' ? (
                            <span className={classNames('style-toggle', 'active')} onClick={() => onChangeSubType('fab')}>
                                商标
                            </span>
                        ) : (
                            <>
                                <span className={classNames('style-toggle', { active: activeSubType === 'fas' })} onClick={() => onChangeSubType('fas')}>
                                    粗体
                                </span>
                                <span className={classNames('style-toggle', { active: activeSubType === 'far' })} onClick={() => onChangeSubType('far')}>
                                    常规
                                </span>
                                <span className={classNames('style-toggle', { active: activeSubType === 'fal' })} onClick={() => onChangeSubType('fal')}>
                                    细体
                                </span>
                                <span className={classNames('style-toggle', { active: activeSubType === 'fat' })} onClick={() => onChangeSubType('fat')}>
                                    超细体
                                </span>
                                <span className={classNames('style-toggle', { active: activeSubType === 'fad' })} onClick={() => onChangeSubType('fad')}>
                                    双色
                                </span>
                            </>
                        )}
                    </div>
                    <div className="r-icon-preview">
                        <ElIcon name={focusIcon.name} prefix={focusIcon.prefix} />
                    </div>
                    <div className="padding-y-2xs">
                        <div className="r-icon-copy-area">
                            <div className="r-copy-item">
                                <small className="text-left">Unicode</small>
                                <ElTooltip content="复制Unicode" placement="top">
                                    <div className="r-copy-code" onClick={() => onCopy('unicode')}>
                                        {focusIcon.unicode}
                                    </div>
                                </ElTooltip>
                            </div>
                            <div className="r-copy-item text-center" style={{ flexGrow: 1 }}>
                                <small className="text-left">React</small>
                                <ElTooltip content="复制React" placement="top">
                                    <div className="r-copy-code" onClick={() => onCopy('jsx')}>
                                        <pre className="language-html" dangerouslySetInnerHTML={{ __html: focusIcon.pre }}></pre>
                                    </div>
                                </ElTooltip>
                            </div>
                            <div className="r-copy-item text-left">
                                <small className="text-left">名称</small>
                                <ElTooltip content="复制图标名称" placement="top">
                                    <div className="r-copy-code" onClick={() => onCopy('name')}>
                                        {focusIcon.name}
                                    </div>
                                </ElTooltip>
                            </div>
                        </div>
                    </div>
                </ElDialog.body>
            </ElDialog>
        </>
    );
};

export default IconList;
