import React, { CSSProperties } from 'react';

type AutoResizeHandler = (event: { height: number; width: number }) => void;

export type AutoResizerProps = {
    disableWidth?: boolean;
    disableHeight?: boolean;
    onResize?: AutoResizeHandler;
    className?: string;
    style?: CSSProperties;
    children?: React.ReactElement | React.ReactElement[];
};

// export type AutoResizerPropsPublic = {
//     onResize?: AutoResizeHandler | undefined;
//     disableWidth?: boolean | undefined;
//     disableHeight?: boolean | undefined;
// };
