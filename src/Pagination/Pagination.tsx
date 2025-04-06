import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { cloneElement, createElement, forwardRef, isValidElement, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import Options from './Options';
import Pager from './Pager';
import { PaginationProps, PaginationRef } from './typings';
import { calculatePage, isValid } from './util';

const Pagination = forwardRef<PaginationRef, PaginationProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            defaultCurrent: 1,
            total: 0,
            defaultPageSize: 10,
            hideOnSinglePage: false,
            showPrevNextJumpers: true,
            showQuickJumper: false,
            showLessItems: false,
            showTitle: true,
            itemRender: (page, type, element) => element,
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
        showQuickJumper,
        showLessItems,
        size,
        showTitle,
        showTotal,
        simple,
        itemRender,
        showPrevNextJumpers,
        pageSizeOptions,
        showSizeChanger,
        onChange,
        onShowSizeChange,
    } = props;

    const { b } = useClassNames(classPrefix);

    const [current, setCurrent] = useControlled<number>(props.current, props.defaultCurrent);
    const [pageSize, setPageSize] = useControlled<number>(props.pageSize, props.defaultPageSize);
    const [hoverJumpPrev, setHoverJumpPrev] = useState(false);
    const [hoverJumpNext, setHoverJumpNext] = useState(false);
    const [inputValue, setInputValue] = useState(current);

    const containerRef = useRef<HTMLUListElement>(null);

    const prevIcon = useMemo(
        () => (
            <Button className={b`item-link`}>
                <Icon name="angle-left" prefix="fal" />
            </Button>
        ),
        [b],
    );

    const nextIcon = useMemo(
        () => (
            <Button className={b`item-link`}>
                <Icon name="angle-right" prefix="fal" />
            </Button>
        ),
        [b],
    );

    const jumpPrevIcon = useMemo(() => <Icon name="ellipsis" className={b`item-link`} />, [b]);
    const jumpNextIcon = useMemo(() => <Icon name="ellipsis" className={b`item-link`} />, [b]);

    // const paginationNode = useRef<HTMLUListElement>(null);

    useMount(() => {
        const hasOnChange = !!onChange;
        const hasCurrent = 'current' in props;
        if (hasCurrent && !hasOnChange) {
            // eslint-disable-next-line no-console
            console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
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

    /** 页码按钮 */
    const getItemIcon = useCallback(
        (icon?: React.ReactElement) => {
            return typeof icon === 'function' ? createElement(icon, { ...props }) : icon || <button type="button" className={b`item-link`} />;
        },
        [b, props],
    );

    /** 是否有上一页 */
    const hasPrev = useMemo(() => current > 1, [current]);

    /** 是否有下一页 */
    const hasNext = useMemo(() => current < calculatePage(undefined, { pageSize }, total), [current, pageSize, total]);

    /** 向前快速跳转几页页码 */
    const jumpPrevPage = useMemo(() => Math.max(1, current - (showLessItems ? 3 : 5)), [current, showLessItems]);

    /** 向后快速跳转几页页码 */
    const jumpNextPage = useMemo(() => Math.min(calculatePage(undefined, { pageSize }, total), current + (showLessItems ? 3 : 5)), [current, pageSize, total, showLessItems]);

    const allPages = useMemo(() => calculatePage(undefined, { pageSize }, total), [pageSize, total]);

    /** 上一页按钮 */
    const prevPage = useMemo(() => {
        const prev = current - 1 > 0 ? current - 1 : 0;
        const prevButton = itemRender?.(prev, 'prev', getItemIcon(prevIcon));
        return isValidElement(prevButton) ? cloneElement(prevButton, { disabled: !hasPrev }) : prevButton;
    }, [current, getItemIcon, hasPrev, itemRender, prevIcon]);

    /** 下一页按钮 */
    const nextPage = useMemo(() => {
        const next = current + 1 < allPages ? current + 1 : allPages;
        const nextButton = itemRender?.(next, 'next', getItemIcon(nextIcon));
        return isValidElement(nextButton) ? cloneElement(nextButton, { disabled: !hasNext }) : nextButton;
    }, [allPages, current, getItemIcon, hasNext, itemRender, nextIcon]);

    /** 分页描述 */
    const totalText = useMemo(
        () =>
            typeof showTotal === 'function' ? (
                <li className={b`total-text`}>{showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize])}</li>
            ) : null,
        [b, current, pageSize, showTotal, total],
    );

    const prevDisabled = useMemo(() => !hasPrev || !allPages, [allPages, hasPrev]);
    const nextDisabled = useMemo(() => !hasNext || !allPages, [allPages, hasNext]);
    const pageBufferSize = useMemo(() => (showLessItems ? 1 : 2), [showLessItems]);

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

    const prev = useCallback(() => {
        if (hasPrev) {
            handleChange(current - 1);
        }
    }, [current, handleChange, hasPrev]);

    const next = useCallback(() => {
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

    const shouldDisplayQuickJumper = useMemo(() => {
        if (total <= pageSize) {
            return false;
        }
        return showQuickJumper;
    }, [pageSize, showQuickJumper, total]);

    /** 改变每页条数 */
    const changePageSize = useCallback(
        (_size: number) => {
            const newCurrent = calculatePage(_size, { pageSize }, total);
            let _current = current > newCurrent ? newCurrent : current;
            // // fix the issue:
            // // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
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

            onShowSizeChange?.(_current, _size);
            onChange?.(_current, _size);
        },
        [current, onChange, onShowSizeChange, pageSize, props, setCurrent, setPageSize, total],
    );

    /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */
    const getShowSizeChanger = useMemo(() => {
        if (typeof showSizeChanger !== 'undefined') {
            return showSizeChanger;
        }
        return total > 50;
    }, [showSizeChanger, total]);

    /** 获取输入的跳转页码 */
    const getValidValue = useCallback(
        (e: any) => {
            const inputVal = (e.target as HTMLInputElement).value;
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

    const handleKeyDown = useCallback((e: any) => {
        if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(e.key)) {
            e.preventDefault();
        }
    }, []);

    const handleKeyUp = useCallback(
        (e: any) => {
            const value = getValidValue(e);
            if (value !== inputValue) {
                setInputValue(value === 0 ? 1 : value);
            }
            if (e.key === 'Enter') {
                handleChange(value);
            } else if (e.key === 'ArrowDown') {
                handleChange(value - 1);
            } else if (e.key === 'ArrowUp') {
                handleChange(value + 1);
            }
        },
        [getValidValue, handleChange, inputValue],
    );

    const handleBlur = useCallback(
        (e: any) => {
            const value = getValidValue(e);
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

    /** 页码 */
    const pagerList = useMemo(() => {
        if (allPages <= 3 + pageBufferSize * 2) {
            const pagerProps = {
                onClick: handleChange,
                showTitle,
                itemRender,
            };
            if (!allPages) {
                return [<Pager {...pagerProps} key="noPager" page={1} className={b`item-disabled`} />];
            }
            return new Array(allPages).fill(0).map((_, i) => {
                const active = current === i + 1;
                return <Pager {...pagerProps} key={i + 1} page={i + 1} active={active} />;
            });
        } else {
            const _pagerList = [];
            const prevItemTitle = showLessItems ? '向前 3 页' : '向前 5 页';
            const nextItemTitle = showLessItems ? '向后 3 页' : '向后 5 页';
            const jumpPrev = (
                <li
                    title={showTitle ? prevItemTitle : undefined}
                    key="prev"
                    onClick={() => handleChange(jumpPrevPage)}
                    tabIndex={0}
                    className={classNames(b`jump-prev`, {
                        [b`jump-prev-custom-icon`]: !!jumpPrevIcon,
                    })}
                    onMouseEnter={() => setHoverJumpPrev(true)}
                    onMouseLeave={() => setHoverJumpPrev(false)}
                >
                    {itemRender?.(jumpPrevPage, 'jump-prev', getItemIcon(hoverJumpPrev ? <Icon name="angles-left" className={b`item-link-icon`} /> : jumpPrevIcon))}
                </li>
            );
            const jumpNext = (
                <li
                    title={showTitle ? nextItemTitle : undefined}
                    key="next"
                    tabIndex={0}
                    onClick={() => handleChange(jumpNextPage)}
                    className={classNames(b`jump-next`, {
                        [b`jump-next-custom-icon`]: !!jumpNextIcon,
                    })}
                    onMouseEnter={() => setHoverJumpNext(true)}
                    onMouseLeave={() => setHoverJumpNext(false)}
                >
                    {itemRender?.(jumpNextPage, 'jump-next', getItemIcon(hoverJumpNext ? <Icon name="angles-right" className={b`item-link-icon`} /> : jumpNextIcon))}
                </li>
            );
            const lastPager = <Pager onClick={handleChange} key={allPages} page={allPages} active={false} showTitle={showTitle} itemRender={itemRender} />;
            const firstPager = <Pager onClick={handleChange} key={1} page={1} active={false} showTitle={showTitle} itemRender={itemRender} />;

            let left = Math.max(1, current - pageBufferSize);
            let right = Math.min(current + pageBufferSize, allPages);

            if (current - 1 <= pageBufferSize) {
                right = 1 + pageBufferSize * 2;
            }

            if (allPages - current <= pageBufferSize) {
                left = allPages - pageBufferSize * 2;
            }

            for (let i = left; i <= right; i += 1) {
                const active = current === i;
                _pagerList.push(<Pager onClick={handleChange} key={i} page={i} active={active} showTitle={showTitle} itemRender={itemRender} />);
            }

            if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
                _pagerList[0] = cloneElement(_pagerList[0], {
                    className: b`item-after-jump-prev`,
                });
                showPrevNextJumpers && _pagerList.unshift(jumpPrev);
            }
            if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
                _pagerList[_pagerList.length - 1] = cloneElement(_pagerList[_pagerList.length - 1], {
                    className: b`item-before-jump-next`,
                });
                showPrevNextJumpers && _pagerList.push(jumpNext);
            }

            if (left !== 1) {
                _pagerList.unshift(firstPager);
            }
            if (right !== allPages) {
                _pagerList.push(lastPager);
            }
            return _pagerList;
        }
    }, [
        allPages,
        pageBufferSize,
        handleChange,
        showTitle,
        itemRender,
        b,
        current,
        showLessItems,
        jumpPrevIcon,
        jumpPrevPage,
        getItemIcon,
        hoverJumpPrev,
        jumpNextIcon,
        jumpNextPage,
        hoverJumpNext,
        showPrevNextJumpers,
    ]);

    /** 跳页 */
    const gotoButton = useMemo(() => {
        if (simple) {
            if (typeof showQuickJumper === 'boolean') {
                return (
                    showQuickJumper && (
                        <Button nativeType="button" onClick={handleGoTO}>
                            确定
                        </Button>
                    )
                );
            } else if (showQuickJumper?.goButton) {
                return (
                    <span onClick={handleGoTO} onKeyUp={handleGoTO}>
                        {showQuickJumper.goButton}
                    </span>
                );
            }
            return (
                <li title={showTitle ? `跳至${current}/${allPages}` : undefined} className={b`simple-pager`}>
                    {gotoButton}
                </li>
            );
        }
    }, [allPages, b, current, handleGoTO, showQuickJumper, showTitle, simple]);

    if (hideOnSinglePage === true && total <= pageSize) {
        return null;
    }

    // 简单分页
    if (simple) {
        return (
            <ul className={classNames(b(), b`simple`, { [b`disabled`]: disabled }, className)} style={style} ref={containerRef}>
                <li
                    title={showTitle ? '上一页' : undefined}
                    onClick={prev}
                    className={classNames(b`prev`, {
                        [b`disabled`]: !hasPrev,
                    })}
                >
                    {prevPage}
                </li>
                <li title={showTitle ? `${current}/${allPages}` : undefined} className={b`simple-pager`}>
                    <input type="text" value={inputValue} disabled={disabled} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onChange={handleKeyUp} onBlur={handleBlur} size={3} />
                    <span className={b`slash`}>/</span>
                    {allPages}
                </li>
                <li
                    title={showTitle ? '下一页' : undefined}
                    onClick={next}
                    className={classNames(b`next`, {
                        [b`disabled`]: !hasNext,
                    })}
                >
                    {nextPage}
                </li>
                {gotoButton}
            </ul>
        );
    }

    return (
        <ul
            className={classNames(b(), className, {
                [b`disabled`]: disabled || total === 0,
                mini: size === 'small',
            })}
            style={style}
            ref={containerRef}
        >
            {totalText}
            <li
                title={showTitle ? '上一页' : undefined}
                onClick={prev}
                className={classNames(b`prev`, {
                    [b`disabled`]: prevDisabled,
                })}
                aria-disabled={prevDisabled}
            >
                {prevPage}
            </li>
            {pagerList}
            <li
                title={showTitle ? '下一页' : undefined}
                onClick={next}
                className={classNames(b`next`, {
                    [b`disabled`]: nextDisabled,
                })}
                aria-disabled={nextDisabled}
            >
                {nextPage}
            </li>
            <Options
                disabled={disabled}
                rootPrefixCls={classPrefix}
                changeSize={getShowSizeChanger ? changePageSize : null}
                current={current}
                pageSize={pageSize}
                pageSizeOptions={pageSizeOptions}
                quickGo={shouldDisplayQuickJumper ? handleChange : undefined}
                goButton={(typeof showQuickJumper !== 'boolean' && showQuickJumper?.goButton) ?? false}
                mini={size === 'small'}
            />
        </ul>
    );
});

Pagination.displayName = 'Pagination';

export default Pagination;
