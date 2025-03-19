import classNames from 'classnames';
import React, { cloneElement, isValidElement } from 'react';
import { Icon } from '../../Icon';
import { AntTreeNodeProps } from '../Tree';

export default function renderSwitcherIcon(
    prefixCls: string,
    switcherIcon: React.ReactElement | null | undefined,
    showLine: boolean | { showLeafIcon: boolean } | undefined,
    { isLeaf, expanded, loading }: AntTreeNodeProps,
) {
    if (loading) {
        return <Icon prefix="fal" name="loader" spin className={`${prefixCls}-switcher-loading-icon`} />;
    }
    let showLeafIcon;
    if (showLine && typeof showLine === 'object') {
        showLeafIcon = showLine.showLeafIcon;
    }
    if (isLeaf) {
        if (showLine) {
            if (typeof showLine === 'object' && !showLeafIcon) {
                return <span className={`${prefixCls}-switcher-leaf-line`} />;
            }
            return <Icon name="file" prefix="fal" className={`${prefixCls}-switcher-line-icon`} />;
        }
        return null;
    }
    const switcherCls = `${prefixCls}-switcher-icon`;
    if (isValidElement(switcherIcon)) {
        return cloneElement(switcherIcon, {
            // @ts-ignore
            className: classNames(switcherIcon.props.className || '', switcherCls),
        });
    }

    if (switcherIcon) {
        return switcherIcon;
    }

    if (showLine) {
        return expanded ? (
            <Icon name="square-minus" prefix="far" className={`${prefixCls}-switcher-line-icon`} />
        ) : (
            <Icon name="square-plus" prefix="far" className={`${prefixCls}-switcher-line-icon`} />
        );
    }
    return <Icon name="angle-right" prefix="far" className={switcherCls} />;
}
