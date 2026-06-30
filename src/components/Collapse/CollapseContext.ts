import { createContext } from 'react';
import { CollapseActiveName } from './typings';

interface CollapseContextProps {
    /** 当前激活的面板(可控模式：如果是手风琴模式，绑定值类型需要为string，否则为array) */
    activeNames: CollapseActiveName[];
    /** 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为string，否则为array) */
    handleItemClick: (name: CollapseActiveName) => void;
}

export const CollapseContext = createContext<CollapseContextProps>({
    activeNames: [],
    handleItemClick: null,
});
