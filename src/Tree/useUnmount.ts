import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import * as React from 'react';

/**
 * Trigger only when component unmount
 */
function useUnmount(triggerStart: () => void, triggerEnd: () => void) {
    const [firstMount, setFirstMount] = React.useState(false);

    useLayoutEffect(() => {
        if (firstMount) {
            triggerStart();

            return () => {
                triggerEnd();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstMount]);

    useLayoutEffect(() => {
        setFirstMount(true);

        return () => {
            setFirstMount(false);
        };
    }, []);
}

export default useUnmount;
