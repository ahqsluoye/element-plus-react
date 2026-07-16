import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import Divider from '@qsxy/element-plus-react/Divider/Divider';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeaderProps } from './typings';

/**
 * @description PageHeader 页面头部组件
 * 用于展示页面的标题、面包屑和操作区域
 */
const PageHeader = memo(
    forwardRef<HTMLDivElement, PageHeaderProps>((props, ref) => {
        const { icon = 'arrow-left', title, content = '', onBack, breadcrumb, extra, className, style, children, ...rest } = props;

        const { b, e, m } = useClassNames('page-header');

        const { locale } = useConfigProvider();
        const { t } = useTranslation();

        /**
         * @description 处理返回按钮点击事件
         */
        const handleClick = useCallback(() => {
            onBack?.();
        }, [onBack]);

        const hasBreadcrumb = useMemo(() => !!breadcrumb, [breadcrumb]);
        const hasExtra = useMemo(() => !!extra, [extra]);
        const hasContent = useMemo(() => !!children, [children]);

        return (
            <div
                ref={ref}
                className={classNames(b(), e('contentful', hasContent), { [m('has-breadcrumb')]: hasBreadcrumb }, { [m('has-extra')]: hasExtra }, className)}
                style={style}
                {...rest}
            >
                {/* 面包屑区域 */}
                {hasBreadcrumb && <div className={e('breadcrumb')}>{breadcrumb}</div>}

                {/* 头部区域 */}
                <div className={e('header')}>
                    <div className={e('left')}>
                        <div className={e('back')} role="button" tabIndex={0} onClick={handleClick}>
                            {/* 图标区域 */}
                            {icon && (
                                <div className={e('icon')}>
                                    <Icon name={icon} />
                                </div>
                            )}
                            {/* 标题区域 */}
                            <div className={e('title')}>{title || t('el.pageHeader.title', { lng: locale })}</div>
                        </div>

                        <Divider direction="vertical" />

                        {/* 内容区域 */}
                        <div className={e('content')}>{content}</div>
                    </div>

                    {/* 额外内容区域（右侧） */}
                    {hasExtra && <div className={e('extra')}>{extra}</div>}
                </div>

                {/* 主内容区域 */}
                {hasContent && <div className={e('main')}>{children}</div>}
            </div>
        );
    }),
);

PageHeader.displayName = 'ElPageHeader';

export default PageHeader;
