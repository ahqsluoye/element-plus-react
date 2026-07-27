import PopupManager from '@qsxy/element-plus-react/Util/PopupManager';
import { useMemo, useRef } from 'react';

export const useZIndex = (visible: boolean, defaultZIndex?: number) => {
    const zIndexRef = useRef<number>(defaultZIndex);

    const zIndex = useMemo(() => (visible ? (zIndexRef.current = defaultZIndex ?? PopupManager.nextZIndex()) : zIndexRef.current), [visible, defaultZIndex]);

    return zIndex;
};
