import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, isValidElement, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider';
import Icon from '../Icon/Icon';
import { isNotEmpty, mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import Options from './Options';
import Pager from './Pager';
import { PaginationProps, PaginationRef } from './typings';
import { calculatePage, isValid } from './util';

const Pagination = forwardRef<PaginationRef, PaginationProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            defaultCurrentPage: 1,
            total: 0,
            size: 'default',
            defaultPageSize: 10,
            hideOnSinglePage: false,
            // showQuickJumper: false,
            pageSizes: [10, 20, 30, 40, 50, 100],
            pagerCount: 7,
            layout: 'prev, pager, next, jumper, ->, total',
            prevIcon: 'angle-left',
            nextIcon: 'angle-right',
        },
        props,
    );
    const {
        classPrefix = 'pagination',
        className,
        style,
        disabled,
        hideOnSinglePage,
        total,
        // showQuickJumper,
        size,
        prevText,
        prevIcon,
        pagerCount,
        nextText,
        nextIcon,
        showTotal,
        layout,
        simple,
        background,
        pageSizes,
        onChange,
        onSizeChange,
    } = props;

    const { b, is, m, e } = useClassNames(classPrefix);
    const { t } = useTranslation();
    const { locale } = useConfigProvider();

    const [current, setCurrent] = useControlled<number>(props.currentPage, props.defaultCurrentPage);
    const [pageSize, setPageSize] = useControlled<number>(props.pageSize, props.defaultPageSize);
    const [hoverJumpPrev, setHoverJumpPrev] = useState(false);
    const [hoverJumpNext, setHoverJumpNext] = useState(false);
    const [inputValue, setInputValue] = useState(current);

    const containerRef = useRef<HTMLDivElement>(null);

    useMount(() => {
        const hasOnChange = !!onChange;
        const hasCurrent = 'currentPage' in props;
        if (hasCurrent && !hasOnChange) {
            // eslint-disable-next-line no-console
            console.warn('Warning: You provided a `currentPage` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
        }

        const _current = Math.min(current, calculatePage(pageSize, undefined, total));
        if (_current <= 0) {
            setCurrent(1);
            !disabled && onChange?.(1, pageSize);
        } else if (current !== _current) {
            setCurrent(_current);
            !disabled && onChange?.(_current, pageSize);
        }
    });

    useEffect(() => {
        setInputValue(current);
        // const lastCurrentNode = paginationNode.current.querySelector(`.${prefixCls}-item-${prevState.current}`);
        // if (lastCurrentNode && document.activeElement === lastCurrentNode) {
        //     lastCurrentNode.blur();
        // }
    }, [current]);

    useEffect(() => {
        const newCurrent = calculatePage(props.pageSize, { pageSize }, total);
        const _current = current > newCurrent ? newCurrent : current;

        setInputValue(_current);

        if (current !== _current) {
            if (!('current' in props)) {
                setCurrent(_current);
                // setInputValue(_current);
            } else {
                !disabled && onChange?.(_current, pageSize);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, total]);

    /** 是否有上一页 */
    const hasPrev = useMemo(() => current > 1, [current]);

    /** 是否有下一页 */
    const hasNext = useMemo(() => current < calculatePage(undefined, { pageSize }, total), [current, pageSize, total]);

    const allPages = useMemo(() => calculatePage(undefined, { pageSize }, total), [pageSize, total]);

    const prevDisabled = useMemo(() => !hasPrev || !allPages || disabled, [allPages, disabled, hasPrev]);
    const nextDisabled = useMemo(() => !hasNext || !allPages || disabled, [allPages, disabled, hasNext]);

    const handleChange = useCallback(
        (p: number) => {
            let page = p;
            if (isValid(page, current, total) && !disabled) {
                const currentPage = calculatePage(undefined, { pageSize }, total);
                if (page > currentPage) {
                    page = currentPage;
                } else if (page < 1) {
                    page = 1;
                }

                setCurrent(page);
                setInputValue(page);
                onChange?.(page, pageSize);
                return page;
            }
            return current;
        },
        [current, disabled, onChange, pageSize, setCurrent, total],
    );

    const handlePrev = useCallback(() => {
        if (hasPrev) {
            handleChange(current - 1);
        }
    }, [current, handleChange, hasPrev]);

    const handleNext = useCallback(() => {
        if (hasNext) {
            handleChange(current + 1);
        }
    }, [current, handleChange, hasNext]);

    const handleGoTO = useCallback(
        (event: any) => {
            if (event.key === 'Enter' || event.type === 'click') {
                handleChange(+inputValue || current);
            }
        },
        [current, handleChange, inputValue],
    );

    /** 改变每页条数 */
    const changePageSize = useCallback(
        (_size: number) => {
            const newCurrent = calculatePage(_size, { pageSize }, total);
            let _current = current > newCurrent ? newCurrent : current;
            // // fix the issue:
            // // Once 'total' is 0, 'current' in 'onSizeChange' is 0, which is not correct.
            if (newCurrent === 0) {
                _current = current;
            }

            if (typeof _size === 'number') {
                if (!('pageSize' in props)) {
                    setPageSize(_size);
                }
                if (!('current' in props)) {
                    setCurrent(_current);
                    setInputValue(_current);
                }
            }

            onSizeChange?.(_size, _current);
            onChange?.(_current, _size);
        },
        [current, onChange, onSizeChange, pageSize, props, setCurrent, setPageSize, total],
    );

    /** 获取输入的跳转页码 */
    const getValidValue = useCallback(
        (event: any) => {
            const inputVal = (event.target as HTMLInputElement).value;
            const _allPages = calculatePage(undefined, { pageSize }, total);
            let value: number;
            if (inputVal === '') {
                value = +inputVal;
                // eslint-disable-next-line no-restricted-globals
            } else if (isNaN(Number(inputVal))) {
                value = current;
            } else if (+inputVal >= _allPages) {
                value = _allPages;
            } else {
                value = Number(inputVal);
            }
            return value;
        },
        [current, pageSize, total],
    );

    const handleKeyDown = useCallback((event: any) => {
        if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(event.key)) {
            event.preventDefault();
        }
    }, []);

    const handleKeyUp = useCallback(
        (event: any) => {
            const value = getValidValue(event);
            if (value !== inputValue) {
                setInputValue(value === 0 ? 1 : value);
            }
            if (event.key === 'Enter') {
                handleChange(value);
            } else if (event.key === 'ArrowDown') {
                handleChange(value - 1);
            } else if (event.key === 'ArrowUp') {
                handleChange(value + 1);
            }
        },
        [getValidValue, handleChange, inputValue],
    );

    const handleBlur = useCallback(
        (event: any) => {
            const value = getValidValue(event);
            handleChange(value);
        },
        [getValidValue, handleChange],
    );

    useImperativeHandle(ref, () => ({
        pageNum: current,
        pageSize,
        setPageNum: handleChange,
        setPageSize: changePageSize,
    }));

    /** 上一页按钮 */
    const prevPage = useMemo(() => {
        let comp = null;
        if (isNotEmpty(prevIcon)) {
            if (typeof prevIcon === 'string') {
                comp = <Icon name={prevIcon} prefix="fal" />;
            } else if (isValidElement(prevIcon)) {
                comp = prevIcon;
            }
        } else if (isNotEmpty(prevText)) {
            comp = prevText;
        }
        return (
            <button key="btn-prev" onClick={handlePrev} className={classNames('btn-prev', b`item`)} aria-disabled={prevDisabled} disabled={prevDisabled}>
                {comp}
            </button>
        );
    }, [b, handlePrev, prevDisabled, prevIcon, prevText]);

    /** 下一页按钮 */
    const nextPage = useMemo(() => {
        let comp = null;
        if (isNotEmpty(nextIcon)) {
            if (typeof nextIcon === 'string') {
                comp = <Icon name={nextIcon} prefix="fal" />;
            } else if (isValidElement(nextIcon)) {
                comp = nextIcon;
            }
        } else if (isNotEmpty(nextText)) {
            comp = nextText;
        }

        return (
            <button key="btn-next" onClick={handleNext} className={classNames('btn-next', b`item`)} aria-disabled={nextDisabled} disabled={nextDisabled}>
                {comp}
            </button>
        );
    }, [b, handleNext, nextDisabled, nextIcon, nextText]);

    /** 分页描述 */
    const totalText = useMemo(
        () =>
            typeof showTotal === 'function' ? (
                <span className={classNames(e`total`, b`item`)}>
                    {showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize])}
                </span>
            ) : (
                <span className={classNames(e`total`, b`item`)}>
                    {t('el.pagination.total', {
                        lng: locale,
                        total,
                    })}
                </span>
            ),
        [b, current, e, locale, pageSize, showTotal, t, total],
    );

    /** 页码 */
    const pagerList = useMemo(() => {
        const halfPagerCount = (pagerCount - 1) / 2;
        let showPrevMore = false;
        let showNextMore = false;
        if (allPages > pagerCount) {
            if (current > pagerCount - halfPagerCount) {
                showPrevMore = true;
            }
            if (current < allPages - halfPagerCount) {
                showNextMore = true;
            }
        }

        const jumpPrev = (
            <li
                key="prev"
                onClick={() => handleChange(current - (pagerCount - 2))}
                tabIndex={0}
                className={classNames(b`jump-prev`, b`jump-prev-custom-icon`, is({ disabled }))}
                onMouseEnter={() => setHoverJumpPrev(true)}
                onMouseLeave={() => setHoverJumpPrev(false)}
            >
                {hoverJumpPrev ? <Icon name="angles-left" /> : <Icon name="ellipsis" />}
            </li>
        );
        const jumpNext = (
            <li
                key="next"
                tabIndex={0}
                onClick={() => handleChange(current + pagerCount - 2)}
                className={classNames(b`jump-next`, b`jump-next-custom-icon`, is({ disabled }))}
                onMouseEnter={() => setHoverJumpNext(true)}
                onMouseLeave={() => setHoverJumpNext(false)}
            >
                {hoverJumpNext ? <Icon name="angles-right" /> : <Icon name="ellipsis" />}
            </li>
        );
        const _pagerList = [];
        if (allPages > 0) {
            _pagerList.push(<Pager onClick={handleChange} key={1} page={1} active={current === 1} disabled={disabled} />);
        }
        if (showPrevMore && !showNextMore) {
            _pagerList.push(jumpPrev);
            const startPage = allPages - (pagerCount - 2);
            for (let i = startPage; i < allPages; i++) {
                const active = current === i;
                _pagerList.push(<Pager onClick={handleChange} key={i} page={i} active={active} disabled={disabled} />);
            }
        } else if (!showPrevMore && showNextMore) {
            for (let i = 2; i < pagerCount; i++) {
                const active = current === i;
                _pagerList.push(<Pager onClick={handleChange} key={i} page={i} active={active} disabled={disabled} />);
            }
            _pagerList.push(jumpNext);
        } else if (showPrevMore && showNextMore) {
            _pagerList.push(jumpPrev);
            const offset = Math.floor(pagerCount / 2) - 1;
            for (let i = current - offset; i <= current + offset; i++) {
                const active = current === i;
                _pagerList.push(<Pager onClick={handleChange} key={i} page={i} active={active} disabled={disabled} />);
            }
            _pagerList.push(jumpNext);
        } else {
            for (let i = 2; i < allPages; i++) {
                const active = current === i;
                _pagerList.push(<Pager onClick={handleChange} key={i} page={i} active={active} disabled={disabled} />);
            }
        }
        if (allPages > 1) {
            const active = current === allPages;
            _pagerList.push(<Pager onClick={handleChange} key={allPages} page={allPages} active={active} disabled={disabled} />);
        }
        return (
            <ul key="pager" className={b('pager', false)}>
                {_pagerList}
            </ul>
        );
    }, [pagerCount, allPages, b, is, disabled, hoverJumpPrev, hoverJumpNext, current, handleChange]);

    const sizes = useCallback(
        (type: 'sizes' | 'jumper') => (
            <Options
                disabled={disabled}
                rootPrefixCls={classPrefix}
                changeSize={changePageSize}
                current={current}
                pageSize={pageSize}
                pageSizeOptions={pageSizes}
                quickGo={handleChange}
                size={size}
                simple={simple}
                type={type}
            />
        ),
        [changePageSize, classPrefix, current, disabled, handleChange, pageSize, pageSizes, simple, size],
    );

    const content = useMemo(() => {
        let haveRightWrapper = false;
        const rootChildren = [];
        const rightWrapperChildren = [];
        const components = layout
            .split(',')
            .filter(item => !!item)
            .map(item => {
                switch (item.trim()) {
                    case 'prev':
                        return prevPage;
                    case 'pager':
                        return pagerList;
                    case 'next':
                        return nextPage;
                    case 'total':
                        return totalText;
                    case 'sizes':
                        return sizes('sizes');
                    case 'jumper':
                        return sizes('jumper');
                    case '->':
                        return '->';

                    default:
                        return null;
                }
            });
        components.forEach(c => {
            if (c === '->') {
                haveRightWrapper = true;
                return;
            }
            if (!haveRightWrapper) {
                rootChildren.push(c);
            } else {
                rightWrapperChildren.push(c);
            }
        });
        return (
            <>
                {rootChildren}
                {rightWrapperChildren.length > 0 ? <div className={e`rightwrapper`}>{rightWrapperChildren}</div> : null}
            </>
        );
    }, [e, layout, nextPage, pagerList, prevPage, sizes, totalText]);

    const simplePage = useMemo(
        () => (
            <>
                {prevPage}
                {sizes('jumper')}
                {nextPage}
            </>
        ),
        [nextPage, prevPage, sizes],
    );

    if (hideOnSinglePage === true && total <= pageSize) {
        return null;
    }

    return (
        <div
            className={classNames(
                b(),
                className,
                {
                    [b`disabled`]: disabled || total === 0,
                },
                is({ background }),
                m(size),
            )}
            style={style}
            ref={containerRef}
        >
            {simple ? simplePage : content}
        </div>
    );
});

Pagination.displayName = 'ElPagination';

export default Pagination;
