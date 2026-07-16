import { randomCode } from '@qsxy/element-plus-react/Util/base';
import { useState } from 'react';

/** 强制刷新 */
export const useForceUpdate = () => {
    const [, setForceUpdate] = useState('');

    return {
        // forceUpdate,
        forceUpdate: () => {
            setForceUpdate(randomCode(5));
        },
    };
};
