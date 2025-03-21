/* eslint-disable indent */
import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Button } from '../Button';
import { Input, InputRef } from '../Input';
import { Popper, PopperOptionRef } from '../Popper';
import { isEmpty, isNotEmpty } from '../Util';
import { partitionAnimationProps, partitionPopperPropsUtils, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import AlphaSlider, { AlphaSliderRef } from './AlphaSlider';
import HueSlider, { HueSliderRef } from './HueSlider';
import Predefine, { PredefineRef } from './Predefine';
import SvPanel, { SvPanelRef } from './SvPanel';
import Color from './color';
import { ColorPickerProps } from './typings';
import { displayedRgb } from './util';

const ColorPicker = forwardRef<any, ColorPickerProps>((props, ref) => {
    const { classPrefix = 'color', className, style, showAlpha, predefine, onChange, onEnter, afterLeave, ...rest } = props;
    const [transitionProps] = partitionAnimationProps(rest);
    const [popperProps] = partitionPopperPropsUtils(rest);
    const { b, bm, be, is } = useClassNames(classPrefix);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const initialColor = useRef<string>();
    const isConfirm = useRef(false);
    useMount(() => {
        initialColor.current = value;
    });

    useEffect(() => {
        initialColor.current = value;
    }, [value]);

    /** hex (当 showAlpha 为 false) / rgb (当 showAlpha 为 true) */
    const colorFormat: 'hsl' | 'hsv' | 'hex' | 'rgb' = useMemo(() => {
        if (showAlpha) {
            return 'rgb';
        } else if (isNotEmpty(props.colorFormat)) {
            return props.colorFormat;
        }
        return 'hex';
    }, [props.colorFormat, showAlpha]);

    const color = useRef(
        new Color({
            enableAlpha: showAlpha,
            format: colorFormat,
            value,
        }),
    );

    const [displayedColor, setdisplayedColor] = useState(() => {
        if (!value) {
            return 'transparent';
        }
        return displayedRgb(color.current, showAlpha);
    });
    const [visible, setVisible] = useState(false);

    const inputRef = useRef<InputRef>();
    const containerRef = useRef<HTMLDivElement>();
    const svPanelRef = useRef<SvPanelRef>();
    const hueSliderRef = useRef<HueSliderRef>();
    const alphaSliderRef = useRef<AlphaSliderRef>();
    const predefineRef = useRef<PredefineRef>();
    const popperInstRef = useRef<PopperOptionRef>();

    useImperativeHandle(ref, () => ({
        get ref() {
            return containerRef;
        },
        get color() {
            return color.current;
        },
    }));

    const handleChange = useCallback(
        (_color: Color) => {
            setdisplayedColor(displayedRgb(_color, showAlpha));
            svPanelRef.current?.update();
            alphaSliderRef.current?.update();
            predefineRef.current?.update();
        },
        [showAlpha],
    );

    /** 确定 */
    const confirmValue = useCallback(() => {
        isConfirm.current = true;
        onChange?.(color.current?.value);
        setValue(color.current?.value);
        setVisible(false);
    }, [onChange, setValue]);

    /** 重置 */
    const onClear = useCallback(() => {
        isConfirm.current = true;
        setVisible(false);
        setdisplayedColor('');
        onChange?.(null);
        setValue(null);
        color.current?.fromString('');
    }, [color, onChange, setValue]);

    /** 手动输入 */
    const handleConfirm = useCallback(() => {
        color.current?.fromString(inputRef.current.getValue());
        setValue(inputRef.current.getValue() as string);
        handleChange(color.current);
    }, [handleChange, setValue]);

    const handleOnEnter = useCallback(
        node => {
            popperInstRef.current?.update();
            svPanelRef.current?.update();
            hueSliderRef.current?.update();
            alphaSliderRef.current?.update();
            onEnter?.(node);
        },
        [onEnter],
    );

    const handleAfterLeave = useCallback(
        node => {
            if (!isConfirm.current) {
                if (initialColor.current) {
                    color.current?.fromString(initialColor.current);
                    setValue(initialColor.current);
                    handleChange(color.current);
                } else {
                    onClear();
                }
            } else {
                isConfirm.current = false;
            }
            afterLeave?.(node);
        },
        [afterLeave, handleChange, onClear, setValue],
    );

    useEffect(() => inputRef.current?.setValue(displayedColor === 'transparent' ? '' : color.current.value), [displayedColor]);

    return (
        <>
            <div
                className={classNames(b`picker`, bm('picker', size), be('tooltip', 'trigger', false), is({ disabled }), className)}
                style={style}
                ref={containerRef}
                onClick={() => {
                    if (!disabled) {
                        setVisible(true);
                    }
                }}
                {...popperProps}
            >
                <div className={be('picker', 'trigger')}>
                    <div className={classNames(be('picker', 'color'), is({ alpha: isEmpty(value) }))}>
                        <div className={be('picker', 'color-inner')} style={{ backgroundColor: displayedColor }} />
                    </div>
                </div>
            </div>

            <Popper
                visible={visible}
                referenceElement={containerRef}
                onDestroy={() => setVisible(false)}
                popperClass={classNames(be('picker', 'panel'), b`dropdown`)}
                popperInstRef={popperInstRef}
                onEnter={handleOnEnter}
                afterLeave={node => handleAfterLeave(node)}
                showArrow={false}
                offset={0}
                unmountOnExit
                {...transitionProps}
            >
                <div>
                    <div className={be('dropdown', 'main-wrapper')}>
                        <HueSlider color={color.current} onChange={handleChange} ref={hueSliderRef} vertical />
                        <SvPanel color={color.current} onChange={handleChange} ref={svPanelRef} />
                    </div>
                    {showAlpha && <AlphaSlider color={color.current} onChange={handleChange} ref={alphaSliderRef} />}
                    {predefine && <Predefine color={color.current} onChange={handleChange} colors={predefine} ref={predefineRef} />}

                    <div className={be('dropdown', 'btns')}>
                        <span className={be('dropdown', 'value')}>
                            <Input
                                ref={inputRef}
                                defaultValue={displayedColor === 'transparent' ? '' : color.current.value}
                                size="small"
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleConfirm();
                                    }
                                }}
                                onBlur={handleConfirm}
                                clearable={false}
                                // onChange={value=>setdisplayedColor(value)}
                            />
                        </span>
                        <Button size="small" type="primary" link className={be('dropdown', 'link-btn')} onClick={onClear}>
                            重置
                        </Button>
                        <Button plain size="small" className={be('dropdown', 'btn')} onClick={confirmValue}>
                            确定
                        </Button>
                    </div>
                </div>
            </Popper>
        </>
    );
});

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
