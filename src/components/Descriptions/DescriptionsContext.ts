import { createContext } from 'react';

interface DescriptionsContextProps {
    /** 排列的方向 */
    direction?: 'vertical' | 'horizontal';
    /** 是否带有边框 */
    border?: boolean;
}

export const DescriptionsContext = createContext<DescriptionsContextProps>({
    direction: 'horizontal',
    border: true,
});
