import noop from 'lodash/noop';
import { createContext, ReactNode } from 'react';
import { CascaderMenuProps, OptionNode } from './typings';

interface CascaderContextProps {
    props: CascaderMenuProps;

    loading?: string;

    searchText?: string;

    onSelect: (level: number, node: object) => void;

    onCheckedChange: (_level: number, node: object, checked: boolean) => void;

    getDataType: (level: number) => boolean;

    nodeFormatter?: (params: { node?: OptionNode; data?: any }) => ReactNode;
}

export const CascaderContext = createContext<CascaderContextProps>({
    onSelect: noop,
    onCheckedChange: noop,
    loading: null,
    searchText: null,
    props: {},
    getDataType: () => false,
    nodeFormatter: null,
});
