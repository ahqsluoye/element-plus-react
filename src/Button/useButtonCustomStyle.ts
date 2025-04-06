import { TinyColor } from '@ctrl/tinycolor';
import { useMemo } from 'react';
import { ButtonProps } from './typings';

export function darken(color: TinyColor, amount = 20) {
    return color.mix('#141414', amount).toString();
}

export function useButtonCustomStyle(props: ButtonProps, cssVarBlock, cssVarName, cssVarBlockName) {
    const { disabled, color, dark, plain } = props;

    // calculate hover & active color by custom color
    // only work when custom color
    return useMemo(() => {
        let styles: Record<string, string> = {};

        let buttonColor = color;

        if (buttonColor) {
            const match = (buttonColor as string).match(/var\((.*?)\)/);
            if (match) {
                buttonColor = window.getComputedStyle(window.document.documentElement).getPropertyValue(match[1]);
            }
            const tinyColor = new TinyColor(buttonColor);
            const activeBgColor = dark ? tinyColor.tint(20).toString() : darken(tinyColor, 20);

            if (plain) {
                styles = cssVarBlock({
                    'bg-color': dark ? darken(tinyColor, 90) : tinyColor.tint(90).toString(),
                    'text-color': buttonColor,
                    'border-color': dark ? darken(tinyColor, 50) : tinyColor.tint(50).toString(),
                    'hover-text-color': `var(${cssVarName('color-white')})`,
                    'hover-bg-color': buttonColor,
                    'hover-border-color': buttonColor,
                    'active-bg-color': activeBgColor,
                    'active-text-color': `var(${cssVarName('color-white')})`,
                    'active-border-color': activeBgColor,
                });

                if (disabled) {
                    styles[cssVarBlockName('disabled-bg-color')] = dark ? darken(tinyColor, 90) : tinyColor.tint(90).toString();
                    styles[cssVarBlockName('disabled-text-color')] = dark ? darken(tinyColor, 50) : tinyColor.tint(50).toString();
                    styles[cssVarBlockName('disabled-border-color')] = dark ? darken(tinyColor, 80) : tinyColor.tint(80).toString();
                }
            } else {
                const hoverBgColor = dark ? darken(tinyColor, 30) : tinyColor.tint(30).toString();
                const textColor = tinyColor.isDark() ? `var(${cssVarName('color-white')})` : `var(${cssVarName('color-black')})`;
                styles = cssVarBlock({
                    'bg-color': buttonColor,
                    'text-color': textColor,
                    'border-color': buttonColor,
                    'hover-bg-color': hoverBgColor,
                    'hover-text-color': textColor,
                    'hover-border-color': hoverBgColor,
                    'active-bg-color': activeBgColor,
                    'active-border-color': activeBgColor,
                });

                if (disabled) {
                    const disabledButtonColor = dark ? darken(tinyColor, 50) : tinyColor.tint(50).toString();
                    styles[cssVarBlockName('disabled-bg-color')] = disabledButtonColor;
                    styles[cssVarBlockName('disabled-text-color')] = dark ? 'rgba(255, 255, 255, 0.5)' : `var(${cssVarName('color-white')})`;
                    styles[cssVarBlockName('disabled-border-color')] = disabledButtonColor;
                }
            }
        }

        return styles;
    }, [color, cssVarBlock, cssVarBlockName, cssVarName, dark, disabled, plain]);
}
