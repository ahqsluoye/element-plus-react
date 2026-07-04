import classNames from 'classnames';
import last from 'lodash/last';
import React, { memo, useContext, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Scrollbar from '../Scrollbar/Scrollbar';
import { ScrollbarRef } from '../Scrollbar/typings';
import { useClassNames } from '../hooks';
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
    const { props: menuProps, onSelect, onCheckedChange, suggestionItemFormatter } = useContext(CascaderContext);
    const { options, separator, value, checkedNodes, onClearSearch } = props;
    const { value: valueKey = 'value', label: labelKey = 'label', multiple } = menuProps;
    const { e, is } = useClassNames('cascader');
    const ulRef = useRef<HTMLUListElement>(null);
    const scrollBarRef = useRef<ScrollbarRef>(null);

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
                    {multiple && checkedNode.includes(key) ? <Icon name="check" /> : null}
                </li>
            );
        });
    }, [checkedNode, e, is, labelKey, multiple, onCheckedChange, onClearSearch, onSelect, options, separator, valueKey, suggestionItemFormatter]);

    return (
        <div className={classNames(e`dorpdown`)} onClick={event => event.stopPropagation()}>
            <Scrollbar wrapClass={e`suggestion-panel`} ref={scrollBarRef}>
                <ul className={e`suggestion-list`} ref={ulRef}>
                    {list}
                    {options?.length === 0 && <li className={classNames(e`empty-text`)}>暂无数据</li>}
                </ul>
            </Scrollbar>
        </div>
    );
});

export default CascaderDropdown;
