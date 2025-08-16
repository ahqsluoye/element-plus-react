import { BaseProps, NativeProps } from '../types/common';

export type AsideProps = BaseProps &
    NativeProps<'--el-aside-width'> & {
        /**
         * 侧边栏宽度
         * @default '300px'
         */
        width?: string | number;
    };

export type ContainerProps = BaseProps &
    NativeProps & {
        /**
         * 子元素的排列方向
         * @default 子元素中有 el-header 或 el-footer 时为 vertical，否则为 horizontal
         */
        direction?: 'horizontal' | 'vertical';
    };

export type HeaderProps = BaseProps &
    NativeProps<'--el-header-padding' | '--el-header-height'> & {
        /**
         * 顶栏高度
         * @default '60px'
         */
        height?: string | number;
    };

export type MainProps = BaseProps & NativeProps;

export type FooterProps = BaseProps &
    NativeProps<'--el-footer-padding' | '--el-footer-height'> & {
        /**
         * 底栏高度
         * @default '60px'
         */
        height?: string | number;
    };
