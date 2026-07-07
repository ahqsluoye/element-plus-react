import classNames from 'classnames';
import React, { Children, forwardRef, useImperativeHandle, useMemo } from 'react';
import Icon from '../Icon/Icon';
import Popper from '../Popper/Popper';
import Tag from '../Tag/Tag';
import Tooltip from '../Tooltip/Tooltip';
import { isEmpty, isNotEmpty } from '../Util';
import { ValidateComponentsMap } from '../Util/icons';
import { useClassNames } from '../hooks';
import { useCalcInputWidth } from '../hooks/useCalcInputWidth';
import Option from './Option';
import OptionGroup from './OptionGroup';
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
        plain,
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
        cachedOptions,
        aliasProps,
        options,
        validateIcon,
        statusIcon,
        validateState,
    } = _props;
    const { b, e, m, is } = nsSelect;
    const nsInput = useClassNames('input');

    const { calculatorRef, inputStyle } = useCalcInputWidth();

    const optionChilds = useMemo(() => {
        if (Children.count(props.children) > 0) {
            return props.children;
        }
        if (options.length > 0) {
            const radios = options.map(item => {
                if (item[aliasProps.options]?.length > 0) {
                    return (
                        <OptionGroup key={item[aliasProps.value]} label={item[aliasProps.label]} disabled={item[aliasProps.disabled]}>
                            {item[aliasProps.options].map(child => (
                                <Option
                                    key={child[aliasProps.value]}
                                    value={child[aliasProps.value]}
                                    label={child[aliasProps.label]}
                                    disabled={child[aliasProps.disabled]}
                                    data={child[aliasProps.data]}
                                />
                            ))}
                        </OptionGroup>
                    );
                }
                return (
                    <Option
                        key={item[aliasProps.value]}
                        value={item[aliasProps.value]}
                        label={item[aliasProps.label]}
                        disabled={item[aliasProps.disabled]}
                        data={item[aliasProps.data]}
                    />
                );
            });
            return radios;
        }
    }, [options, props.children, aliasProps.data, aliasProps.disabled, aliasProps.label, aliasProps.options, aliasProps.value]);

    useImperativeHandle(ref, () => ({
        popperInstRef,
        getValue: () => value,
        setValue,
        onClear,
        clear: onClear,
        setVisible,
        cachedOptions,
        onChoose,
    }));

    return (
        <div
            className={classNames(b(), e`default`, is({ disabled }), m({ [size]: size }), props.className)}
            style={append || prepend ? {} : props.style}
            ref={containerRef}
            onMouseEnter={() => setInputHovering(true)}
            onMouseLeave={() => setInputHovering(false)}
        >
            <div ref={wrapperRef} className={classNames(e`wrapper`, is({ disabled, filterable, plain }))} style={append || prepend ? props.style : {}} onClick={toggleMenu}>
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
                {!plain && (
                    <div ref={suffixWrapperRef} className={classNames(e`suffix`, is`hidden-clear`)}>
                        {iconComponent ? <Icon name={iconComponent} className={classNames(e`caret`, e`icon`, e`arrow`, iconReverse)} onClick={toggleMenu}></Icon> : null}
                        {clearIcon ? <Icon prefix="fal" name={clearIcon} className={classNames(e`caret`, e`icon`, e`clear`)} onClick={onClear} /> : null}
                        {validateState && validateIcon && statusIcon && (
                            <Icon
                                {...ValidateComponentsMap[validateState]}
                                className={classNames(nsInput.e('icon'), nsInput.e('validateIcon'), is('loading', validateState === 'validating'))}
                            />
                        )}
                    </div>
                )}
            </div>

            <Popper
                referenceElement={containerRef}
                visible={visible}
                popperClass={classNames(e`popper`, is`pure`)}
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
                unmountOnExit={props.unmountOnExit}
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
                    cachedOptions={cachedOptions}
                >
                    {optionChilds}
                </SelectDropdown>
            </Popper>
        </div>
    );
});

SelectCore.displayName = 'SelectCore';

export default SelectCore;
