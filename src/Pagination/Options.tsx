import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ElInput } from '..';
import { useConfigProvider } from '../ConfigProvider';
import ElOption from '../Select/Option';
import Select from '../Select/Select';
import { useClassNames } from '../hooks';
import { TypeAttributes } from '../types/common';

interface Props {
    goButton?: React.ReactElement | boolean;
    quickGo?: (val: number) => void;
    rootPrefixCls?: string;
    pageSize: number;
    /** 默认的每页条数 */
    defaultPageSize?: number;
    pageSizeOptions?: Array<number>;
    selectComponentClass?: string;
    selectPrefixCls?: string;
    disabled?: boolean;
    simple?: boolean;
    current?: number;
    changeSize: ((page: number) => void) | null;
    size?: TypeAttributes.Size;
    type: 'sizes' | 'jumper';
}

const Options: FC<Props> = props => {
    const { rootPrefixCls, changeSize, quickGo, current, goButton, disabled, simple, pageSizeOptions: _pageSizeOptions, pageSize, defaultPageSize, type, size } = props;
    const [goInputText, setGoInputText] = useState('');
    const { b, e, is } = useClassNames(rootPrefixCls);
    const { t } = useTranslation();
    const { locale } = useConfigProvider();

    const getValidValue = useMemo(() => (!goInputText || typeof goInputText === 'number' ? undefined : Number(goInputText)), [goInputText]);

    const go = useCallback(
        (event: any) => {
            if (goInputText === '') {
                return;
            }
            if (event.key === 'Enter' || event.type === 'click') {
                getValidValue && quickGo?.(getValidValue);
            }
        },
        [getValidValue, goInputText, quickGo],
    );

    const handleChangeSize = useCallback(
        (value: string) => {
            changeSize?.(Number(value));
        },
        [changeSize],
    );

    const handleChange = useCallback((value: string) => {
        setGoInputText(value);
    }, []);

    const handleBlur = useCallback(
        (event: any) => {
            if (goButton || goInputText === '') {
                return;
            }
            setGoInputText('');
            if (event.relatedTarget && (event.relatedTarget.className.indexOf(b`item-link`) >= 0 || event.relatedTarget.className.indexOf(b`item`) >= 0)) {
                return;
            }
            getValidValue && quickGo?.(getValidValue);
        },
        [b, getValidValue, goButton, goInputText, quickGo],
    );

    const pageSizeOptions = useMemo(() => {
        if (_pageSizeOptions.some(option => option.toString() === pageSize.toString())) {
            return _pageSizeOptions;
        }
        return _pageSizeOptions.concat([pageSize]).sort((x, y) => {
            const numberA = isNaN(Number(x)) ? 0 : Number(x);
            const numberB = isNaN(Number(y)) ? 0 : Number(y);
            return numberA - numberB;
        });
    }, [_pageSizeOptions, pageSize]);

    const changeSelect = useMemo(() => {
        return (
            changeSize && (
                <Select
                    disabled={disabled}
                    filterable={false}
                    className={b`size-changer`}
                    clearable={false}
                    size={size}
                    value={pageSize}
                    defaultValue={defaultPageSize || _pageSizeOptions[0]}
                    onChange={handleChangeSize}
                >
                    {pageSizeOptions.map((opt, i) => (
                        <ElOption key={i} value={opt} label={`${opt} ${t('el.pagination.pagesize', { lng: locale })}`} />
                    ))}
                </Select>
            )
        );
    }, [changeSize, disabled, b, size, pageSize, defaultPageSize, _pageSizeOptions, handleChangeSize, pageSizeOptions, t, locale]);

    useEffect(() => setGoInputText(current + ''), [current]);

    const goInput = useMemo(() => {
        return (
            <>
                {simple ? null : <span className={e`goto`}>{t('el.pagination.goto', { lng: locale })}</span>}
                <ElInput className={e`editor`} disabled={disabled} value={goInputText} size={size} onChange={handleChange} onKeyUp={go} placeholder="" clearable={false} />
                {simple ? null : <span className={e`classifier`}>{t('el.pagination.pageClassifier', { lng: locale })}</span>}
            </>
        );
    }, [disabled, e, go, goInputText, handleChange, locale, simple, size, t]);

    if (type === 'sizes') {
        return <span className={classNames(e`sizes`, b`item`)}>{changeSelect}</span>;
    }
    if (type === 'jumper') {
        return <span className={classNames(e`jump`, b`item`, is({ simple }))}>{goInput}</span>;
    }
    return null;
};

export default Options;
