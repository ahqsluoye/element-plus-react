import noop from 'lodash/noop';
import { createContext, ReactNode } from 'react';
import { CascaderMenuProps, CascaderNode } from './typings';

interface CascaderContextProps {
    props: CascaderMenuProps;

    loading?: string;

    searchText?: string;

    onSelect: (level: number, node: object) => void;

    onCheckedChange: (_level: number, node: object, checked: boolean) => void;

    getDataType: (level: number) => boolean;

    nodeFormatter?: (params: { node?: CascaderNode; data?: any }) => ReactNode;

    /** 自定义建议项格式化函数 */
    suggestionItemFormatter?: (item: CascaderNode[]) => ReactNode;
}

export const CascaderContext = createContext<CascaderContextProps>({
    onSelect: noop,
    onCheckedChange: noop,
    loading: null,
    searchText: null,
    props: {},
    getDataType: () => false,
    nodeFormatter: null,
    suggestionItemFormatter: null,
});
