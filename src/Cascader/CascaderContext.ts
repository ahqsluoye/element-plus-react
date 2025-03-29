import noop from 'lodash/noop';
import { createContext } from 'react';
import { CascaderMenuProps } from './typings';

interface CascaderContextProps {
    props: CascaderMenuProps;

    loading?: string;

    searchText?: string;

    onSelect: (level: number, node: object) => void;

    onCheckedChange: (_level: number, node: object, checked: boolean) => void;

    getDataType: (level: number) => boolean;
}

export const CascaderContext = createContext<CascaderContextProps>({
    onSelect: noop,
    onCheckedChange: noop,
    loading: null,
    searchText: null,
    props: {},
    getDataType: () => false,
});
