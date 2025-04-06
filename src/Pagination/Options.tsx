import React, { FC, useCallback, useMemo, useState } from 'react';
import Select from '../Select/Select';
import { useClassNames } from '../hooks';

interface Props {
    goButton?: React.ReactElement | boolean;
    quickGo?: (val: number) => void;
    rootPrefixCls?: string;
    pageSize: number;
    pageSizeOptions?: Array<string>;
    selectComponentClass?: string;
    selectPrefixCls?: string;
    disabled?: boolean;
    current?: number;
    changeSize: ((page: number) => void) | null;
    mini?: boolean;
}

const Options: FC<Props> = props => {
    const { rootPrefixCls, changeSize, quickGo, goButton, disabled, pageSizeOptions: _pageSizeOptions = ['10', '20', '50', '100'], pageSize, mini } = props;
    const [goInputText, setGoInputText] = useState('');
    const { b } = useClassNames(`${rootPrefixCls}-options`);

    const getValidValue = useMemo(() => (!goInputText || typeof goInputText === 'number' ? undefined : Number(goInputText)), [goInputText]);

    const go = useCallback(
        (e: any) => {
            if (goInputText === '') {
                return;
            }
            if (e.key === 'Enter' || e.type === 'click') {
                setGoInputText('');
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

    const handleChange = useCallback((e: any) => {
        setGoInputText(e.target.value);
    }, []);

    const handleBlur = useCallback(
        (e: any) => {
            if (goButton || goInputText === '') {
                return;
            }
            setGoInputText('');
            if (e.relatedTarget && (e.relatedTarget.className.indexOf(b`item-link`) >= 0 || e.relatedTarget.className.indexOf(b`item`) >= 0)) {
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
        return _pageSizeOptions.concat([pageSize.toString()]).sort((x, y) => {
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
                    size={mini ? 'small' : null}
                    value={(pageSize.toString() || _pageSizeOptions[0]).toString()}
                    // @ts-ignore
                    onChange={handleChangeSize}
                >
                    {pageSizeOptions.map((opt, i) => (
                        <Select.Option key={i} value={opt} label={`${opt} 条/页`} />
                    ))}
                </Select>
            )
        );
    }, [changeSize, disabled, b, mini, pageSize, _pageSizeOptions, handleChangeSize, pageSizeOptions]);

    const goInput = useMemo(() => {
        if (quickGo) {
            let gotoButton;
            if (goButton) {
                gotoButton =
                    typeof goButton === 'boolean' ? (
                        <button type="button" onClick={go} onKeyUp={go} disabled={disabled} className={b`quick-jumper-button`}>
                            确定
                        </button>
                    ) : (
                        <span onClick={go} onKeyUp={go}>
                            {goButton}
                        </span>
                    );
            }
            return (
                <div className={b`quick-jumper`}>
                    跳至
                    <input disabled={disabled} type="text" value={goInputText} onChange={handleChange} onKeyUp={go} onBlur={handleBlur} />页{gotoButton}
                </div>
            );
        }
        return null;
    }, [b, disabled, go, goButton, goInputText, handleBlur, handleChange, quickGo]);

    if (!changeSize && !quickGo) {
        return null;
    }

    return (
        <li className={b()}>
            {changeSelect}
            {goInput}
        </li>
    );
};

export default Options;
