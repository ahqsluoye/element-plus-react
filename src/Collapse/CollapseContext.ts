import { createContext } from 'react';
import { CollapseProps } from './typings';

interface CollapseContextProps {
    /** 当前激活的面板(可控模式：如果是手风琴模式，绑定值类型需要为string，否则为array) */
    value: CollapseProps['activeName'];
    setValue: (value: CollapseProps['activeName']) => void;
    /** 是否手风琴模式 */
    accordion: boolean;
    /** 当前激活面板改变时触发(如果是手风琴模式，参数 activeNames 类型为string，否则为array) */
    onChange: (activeNames: string | string[]) => void;
}

export const CollapseContext = createContext<CollapseContextProps>({
    value: null,
    setValue: null,
    accordion: false,
    onChange: null,
});
