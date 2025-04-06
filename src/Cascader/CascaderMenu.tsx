/* eslint-disable indent */
import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useContext, useImperativeHandle, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import Scrollbar from '../Scrollbar/Scrollbar';
import { ScrollbarRef } from '../Scrollbar/typings';
import { useClassNames } from '../hooks';
import { CascaderContext } from './CascaderContext';
import { OptionNode } from './typings';

interface Props {
    data: OptionNode[];
    level: number;
    value: string;
}

export interface CascaderMenuRef {
    scrollToSelected: () => void;
}

const CascaderMenu = memo(
    forwardRef<CascaderMenuRef, Props>((props, ref) => {
        const { data = [], level, value } = props;
        const { props: menuProps, onSelect, onCheckedChange, loading } = useContext(CascaderContext);
        const { valueKey = 'value', labelKey = 'label', disabledKey = 'disabled', multiple, expandTrigger } = menuProps;
        const { b, be, is } = useClassNames('cascader');
        const ulRef = useRef<ScrollbarRef>(null);

        const scrollToSelected = useCallback(() => {
            if (ulRef.current?.resizeRef?.current) {
                const node = ulRef.current.resizeRef.current.querySelectorAll('.in-active-path');
                if (node && node.length > 0) {
                    setTimeout(() => {
                        scrollIntoView(node[0], {
                            scrollMode: 'if-needed',
                            block: 'center',
                        });
                    }, 150);
                }
            }
        }, []);

        useImperativeHandle(ref, () => ({
            scrollToSelected: () => {
                scrollToSelected();
            },
        }));

        return (
            <Scrollbar
                ref={ulRef}
                tag="ul"
                className={classNames(b`menu`, is('list'))}
                wrapClass={be('menu', 'wrap')}
                viewClass={classNames(be('menu', 'list'), { [b('no-data', false)]: data?.length === 0 })}
            >
                {data?.length > 0 &&
                    data.map(item => {
                        return (
                            <li
                                key={item.__id}
                                className={classNames(
                                    b`node`,
                                    { 'in-active-path': multiple ? item.__checked || item.__indeterminate : value === item[valueKey] },
                                    is({ disabled: item[disabledKey] }),
                                )}
                                onClick={() => {
                                    if (!item[disabledKey]) {
                                        if (expandTrigger === 'click' || item.__leaf) {
                                            onSelect?.(level, item);
                                        }
                                    }
                                }}
                                onMouseEnter={() => {
                                    if (expandTrigger === 'hover' && !item[disabledKey] && !item.__leaf) {
                                        onSelect?.(level, item);
                                    }
                                }}
                            >
                                {multiple && (
                                    <Checkbox
                                        checked={item.__checked}
                                        indeterminate={item.__indeterminate}
                                        onChange={(checked: boolean) => onCheckedChange?.(level, item, checked)}
                                    />
                                )}
                                <span className={be('node', 'label')}>{item[labelKey]}</span>
                                {!item.__leaf && loading !== item.__id && <Icon name="angle-right" className={be('node', 'postfix')} />}
                                {loading === item.__id && <Icon prefix="fas" name="spinner" spin className={be('node', 'postfix')} />}
                            </li>
                        );
                    })}
                {data?.length === 0 && (loading ? '正在加载数据...' : '暂无数据!')}
            </Scrollbar>
        );
    }),
);

export default CascaderMenu;
