/* eslint-disable indent */
import Checkbox from '@qsxy/element-plus-react/Checkbox/Checkbox';
import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import { Radio } from '@qsxy/element-plus-react/Radio';
import Scrollbar from '@qsxy/element-plus-react/Scrollbar/Scrollbar';
import { ScrollbarRef } from '@qsxy/element-plus-react/Scrollbar/typings';
import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useContext, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import scrollIntoView from 'scroll-into-view-if-needed';
import { CascaderContext } from './CascaderContext';
import { CascaderNode } from './typings';

interface Props {
    data: CascaderNode[];
    level: number;
    value: string;
}

export interface CascaderMenuRef {
    scrollToSelected: () => void;
}

const CascaderMenu = memo(
    forwardRef<CascaderMenuRef, Props>((props, ref) => {
        const { data = [], level, value } = props;
        const { props: menuProps, onSelect, onCheckedChange, loading, nodeFormatter } = useContext(CascaderContext);
        const { value: valueKey = 'value', label: labelKey = 'label', disabled: disabledKey = 'disabled', multiple, expandTrigger, checkStrictly } = menuProps;
        const { b, be, is } = useClassNames('cascader');
        const ulRef = useRef<ScrollbarRef>(null);

        const { locale } = useConfigProvider();
        const { t } = useTranslation();

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
                                    { 'in-active-path': multiple ? item.__checked || item.__indeterminate || value === item[valueKey] : value === item[valueKey] },
                                    is({ disabled: item[disabledKey] }),
                                )}
                                onClick={() => {
                                    if (!item[disabledKey]) {
                                        if (expandTrigger === 'click' || item.__leaf) {
                                            onSelect?.(level, item);
                                            if (item.__leaf && multiple) {
                                                onCheckedChange?.(level, item, !item.__checked);
                                            }
                                        }
                                    }
                                }}
                                onMouseEnter={() => {
                                    if (expandTrigger === 'hover' && !item[disabledKey] && !item.__leaf) {
                                        onSelect?.(level, item);
                                    }
                                }}
                            >
                                {checkStrictly && !multiple && (
                                    <Radio
                                        checked={item.__checked}
                                        onClick={e => e.stopPropagation()}
                                        onChange={e => {
                                            if (!item[disabledKey]) {
                                                onSelect?.(level, item, true);
                                            }
                                        }}
                                    />
                                )}
                                {multiple && (
                                    <Checkbox
                                        checked={item.__checked}
                                        indeterminate={item.__indeterminate}
                                        onClick={e => e.stopPropagation()}
                                        onChange={(checked: boolean) => {
                                            if (!item[disabledKey]) {
                                                if (expandTrigger === 'click' || item.__leaf) {
                                                    onSelect?.(level, item, checkStrictly);
                                                }
                                            }
                                            onCheckedChange?.(level, item, checked);
                                        }}
                                    />
                                )}
                                {nodeFormatter ? nodeFormatter?.({ node: item, data: item.data }) : <span className={be('node', 'label')}>{item[labelKey]}</span>}
                                {!item.__leaf && loading !== item.__id && <Icon name="angle-right" className={be('node', 'postfix')} />}
                                {loading === item.__id && <Icon prefix="fas" name="spinner" spin className={be('node', 'postfix')} />}
                            </li>
                        );
                    })}
                {data?.length === 0 && (loading ? t('el.cascader.loading', { lng: locale }) : t('el.cascader.noData', { lng: locale }))}
            </Scrollbar>
        );
    }),
    // (prev, next) => {
    //     console.log(isEqual(prev, next));
    //     return isEqual(prev, next);
    // },
);

export default CascaderMenu;
