import { useState } from 'react';
import { randomCode } from '../Util';

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
