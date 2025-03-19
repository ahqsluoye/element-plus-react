import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { useClassNames, useControlled } from '../hooks';
import { CollapseContext } from './CollapseContext';
import { CollapseProps } from './typings';

const Collapse: FC<CollapseProps> = memo(props => {
    const { defaultActiveName, activeName, accordion, onChange, classPrefix = 'collapse' } = props;
    const { b } = useClassNames(classPrefix);

    const [value, setValue] = useControlled(activeName, defaultActiveName);

    return (
        <div className={classNames(b(), props.className)} style={props.style}>
            <CollapseContext.Provider value={{ value, setValue, accordion, onChange }}>{props.children}</CollapseContext.Provider>
        </div>
    );
});

Collapse.displayName = 'Collapse';

export default Collapse;
