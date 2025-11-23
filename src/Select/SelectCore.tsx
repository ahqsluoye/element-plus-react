import classNames from 'classnames';
import React, { forwardRef, useImperativeHandle } from 'react';
import Icon from '../Icon/Icon';
import Popper from '../Popper/Popper';
import Tag from '../Tag/Tag';
import Tooltip from '../Tooltip/Tooltip';
import { isEmpty, isNotEmpty } from '../Util';
import { useCalcInputWidth } from '../hooks/useCalcInputWidth';
import SelectDropdown from './SelectDropdown';
import { SelectProps, SelectRef } from './typings';
import useSelect from './useSelect';

const SelectCore = forwardRef<SelectRef, SelectProps>((props, ref) => {
    const _props = useSelect(props);
    const {
        nsSelect,
        containerRef,
        contentRef,
        wrapperRef,
        suffixWrapperRef,
        popperInstRef,
        selectDropdownRef,
        tagTooltipRef,
        inputRef,
        inputValue,
        setInputHovering,
        setInputValue,
        setIsFocused,
        filterable,
        remote,
        clearIcon,
        multiple,
        collapseTags,
        maxCollapseTags,
        collapseTagsTooltip,
        tagType,
        tagEffect,
        showArrow,
        collapseTips,
        allowCreate,
        prepend,
        append,
        transitionProps,
        popperProps,
        value,
        setValue,
        disabled,
        size,
        multiValue,
        multiOptionData,
        label,
        visible,
        setVisible,
        popperStyle,
        placeholder,
        shouldShowPlaceholder,
        handleEnter,
        handleAfterLeave,
        toggleMenu,
        onCloseTag,
        onClear,
        onChoose,
        labelFormat,
        iconComponent,
        iconReverse,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
        tag,
    } = _props;
    const { b, e, m, is } = nsSelect;

    const { calculatorRef, inputStyle } = useCalcInputWidth();

    useImperativeHandle(ref, () => ({
        popperInstRef,
        getValue: () => value,
        setValue,
        onClear,
        clear: onClear,
        setVisible,
    }));

    return (
        <div
            className={classNames(b(), e`default`, is({ disabled }), m({ [size]: size }), props.className)}
            style={append || prepend ? {} : props.style}
            ref={containerRef}
            onMouseEnter={() => setInputHovering(true)}
            onMouseLeave={() => setInputHovering(false)}
        >
            <div ref={wrapperRef} className={classNames(e`wrapper`, is({ disabled, filterable }))} style={props.style} onClick={toggleMenu}>
                <div className={classNames(e`selection`, is({ near: multiple && multiValue.length > 0 }))}>
                    {multiple &&
                        (tag ? (
                            tag({ data: multiOptionData, selectDisabled: disabled, deleteTag: onCloseTag })
                        ) : (
                            <>
                                {(collapseTags ? multiOptionData.slice(0, maxCollapseTags) : multiOptionData).map((item, i) => {
                                    return (
                                        <div key={`${item.value}_${i}`} className={e`selected-item`}>
                                            <Tag
                                                type={tagType}
                                                closable={!disabled}
                                                effect={tagEffect}
                                                onClick={toggleMenu}
                                                onClose={event => onCloseTag(event, item)}
                                                disableTransitions
                                            >
                                                {isNotEmpty(item.value) && typeof item.value === 'string' && labelFormat
                                                    ? labelFormat?.(-1, item.value, item.label)
                                                    : item.label ?? item.value}
                                            </Tag>
                                        </div>
                                    );
                                })}
                                {collapseTags && multiValue?.length > maxCollapseTags && (
                                    <Tooltip
                                        ref={tagTooltipRef}
                                        popperClass={e`tooltip`}
                                        placement="top"
                                        disabled={!collapseTagsTooltip}
                                        content={
                                            <div className={e`selection`}>
                                                {multiOptionData.slice(maxCollapseTags, multiOptionData.length).map((item, i) => (
                                                    <div key={`${item.value}_${i}`} className={e`selected-item`}>
                                                        <Tag
                                                            type={tagType}
                                                            disableTransitions
                                                            closable={!disabled}
                                                            effect={tagEffect}
                                                            onClick={toggleMenu}
                                                            onClose={evt => onCloseTag(evt, item)}
                                                        >
                                                            {isNotEmpty(item.value) && typeof item.value === 'string' && labelFormat
                                                                ? labelFormat?.(-1, item.value, item.label)
                                                                : item.label ?? item.value}
                                                        </Tag>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                        effect="light"
                                        enterable
                                    >
                                        <div className={e`selected-item`}>
                                            <Tag type={tagType} onClick={toggleMenu} disableTransitions effect={tagEffect}>
                                                {collapseTips
                                                    ? collapseTips(multiOptionData.length - maxCollapseTags, multiOptionData.length)
                                                    : `+ ${multiOptionData.length - maxCollapseTags}`}
                                            </Tag>
                                        </div>
                                    </Tooltip>
                                )}
                            </>
                        ))}
                    <div className={classNames(e`selected-item`, e`input-wrapper`, is({ hidden: !filterable }))}>
                        <input
                            ref={inputRef}
                            value={inputValue}
                            type="text"
                            className={classNames(e`input`, is(size))}
                            style={inputStyle}
                            disabled={disabled}
                            readOnly={!filterable}
                            onClick={toggleMenu}
                            onCompositionStart={handleCompositionStart}
                            onCompositionUpdate={handleCompositionUpdate}
                            onCompositionEnd={handleCompositionEnd}
                            onChange={event => {
                                setInputValue(event.target.value);
                                setVisible(true);
                            }}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    if (allowCreate && isNotEmpty(inputValue)) {
                                        onChoose(inputValue, { value: inputValue, label: inputValue }, event);
                                    }
                                }
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            // error={error}
                            // warning={warning}
                            // style={multiple ? { height: inputHeight } : {}}
                            // suffix={<Icon prefix="fal" name="angle-down" rotate={visible ? 180 : null} onClick={toggleMenu} />}
                        />
                        {filterable ? (
                            <span ref={calculatorRef} aria-hidden="true" className={e`input-calculator`}>
                                {inputValue}
                            </span>
                        ) : null}
                    </div>
                    {shouldShowPlaceholder && (
                        <div className={classNames(e`selected-item`, e`placeholder`, is({ transparent: isEmpty(label) || (visible && !inputValue) }))}>
                            {isNotEmpty(value) && typeof value === 'string' && labelFormat ? labelFormat?.(-1, value, placeholder) : <span>{placeholder}</span>}
                        </div>
                    )}
                </div>
                <div ref={suffixWrapperRef} className={classNames(e`suffix`, is`hidden-clear`)}>
                    {iconComponent ? <Icon name={iconComponent} className={classNames(e`caret`, e`icon`, e`arrow`, iconReverse)} onClick={toggleMenu}></Icon> : null}
                    {clearIcon ? <Icon prefix="fal" name={clearIcon} className={classNames(e`caret`, e`icon`, e`clear`)} onClick={onClear} /> : null}
                </div>
            </div>

            <Popper
                referenceElement={containerRef}
                visible={visible}
                popperClass={e`popper`}
                popperInstRef={popperInstRef}
                popperStyle={{ ...popperStyle, visibility: filterable && remote && isEmpty(inputValue) ? 'hidden' : 'visible' }}
                onDestroy={() => {
                    setVisible(false);
                    setInputValue('');
                    setIsFocused(false);
                }}
                onEnter={handleEnter}
                afterLeave={handleAfterLeave}
                placement={'bottom-start'}
                transitionAppear
                unmountOnExit
                showArrow={showArrow}
                {...transitionProps}
                {...popperProps}
            >
                <SelectDropdown
                    ref={selectDropdownRef}
                    value={value}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    onChoose={onChoose}
                    contentRef={contentRef}
                    popperInstRef={popperInstRef}
                    {..._props}
                    onClear={props.onClear}
                >
                    {props.children}
                </SelectDropdown>
            </Popper>
        </div>
    );
});

SelectCore.displayName = 'SelectCore';

export default SelectCore;
