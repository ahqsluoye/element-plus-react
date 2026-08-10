import { useRef } from 'react';

const useComponentWillMount = (func: () => void) => {
    const willMountRef = useRef(true);

    if (willMountRef.current) {
        func();
    }

    willMountRef.current = false;
};
export default useComponentWillMount;
