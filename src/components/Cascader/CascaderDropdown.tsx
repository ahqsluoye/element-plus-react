import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElScrollbar from '@qsxy/element-plus-react/Scrollbar/Scrollbar';
import { ScrollbarRef } from '@qsxy/element-plus-react/Scrollbar/typings';
import classNames from 'classnames';
import last from 'lodash/last';
import React, { memo, use, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CascaderContext } from './CascaderContext';
import { CascaderNode } from './typings';

interface Props {
    /** 用于分隔选项的字符 */
    separator: string;
    options: CascaderNode[][];
    value: string[] | string[][];
    checkedNodes: () => CascaderNode[][];
    onClearSearch: () => void;
}

const CascaderDropdown = memo((props: Props) => {
    const { props: menuProps, onSelect, onCheckedChange, suggestionItemFormatter } = use(CascaderContext);
    const { options, separator, value, checkedNodes, onClearSearch } = props;
    const { value: valueKey = 'value', label: labelKey = 'label', multiple } = menuProps;
    const { e, is } = useClassNames('cascader');
    const ulRef = useRef<HTMLUListElement>(null);
    const scrollBarRef = useRef<ScrollbarRef>(null);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    const [checkedNode, setCheckedNode] = useState(multiple ? (value as string[][]).map(item => item.join(separator)) : [value.join(separator)]);

    const list = useMemo(() => {
        return options.map(item => {
            const key = item.map(node => node[valueKey]).join(separator);
            const checked = checkedNode.includes(key);
            return (
                <li
                    className={classNames(e`suggestion-item`, is({ checked }))}
                    key={key}
                    onClick={() => {
                        if (multiple) {
                            setCheckedNode(checked ? checkedNode.filter(node => node !== key) : [...checkedNode, key]);
                            item.forEach(node => {
                                onSelect(node.__level, node);
                            });
                            const node = last(item);
                            onCheckedChange(node.__level, node, !checked);
                        } else {
                            item.forEach(node => {
                                onSelect(node.__level, node);
                            });
                        }
                        onClearSearch();
                    }}
                >
                    {suggestionItemFormatter ? suggestionItemFormatter(item) : item.map(node => node[labelKey]).join(separator)}
                    {multiple && checkedNode.includes(key) ? <ElIcon name="check" /> : null}
                </li>
            );
        });
    }, [checkedNode, e, is, labelKey, multiple, onCheckedChange, onClearSearch, onSelect, options, separator, valueKey, suggestionItemFormatter]);

    return (
        <div className={classNames(e`dorpdown`)} onClick={event => event.stopPropagation()}>
            <ElScrollbar wrapClass={e`suggestion-panel`} ref={scrollBarRef}>
                <ul className={e`suggestion-list`} ref={ulRef}>
                    {list}
                    {options?.length === 0 && <li className={classNames(e`empty-text`)}>{t('el.cascader.noMatch', { lng: locale })}</li>}
                </ul>
            </ElScrollbar>
        </div>
    );
});

export default CascaderDropdown;
