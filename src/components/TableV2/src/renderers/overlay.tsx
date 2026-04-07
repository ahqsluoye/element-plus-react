import React from 'react';
import type { SimpleFunctionalComponent } from '../types';

const Overlay: SimpleFunctionalComponent = props => {
    return (
        <div className={props.className} style={props.style}>
            {props.children}
        </div>
    );
};

Overlay.displayName = 'ElTableV2Overlay';

export default Overlay;
