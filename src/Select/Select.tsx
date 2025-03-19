import React, { Ref, RefObject, forwardRef, memo, useRef } from 'react';
import { InputGroup } from '../Input';
import Option from './Option';
import OptionGroup from './OptionGroup';
import SelectCore from './SelectCore';
import { SelectProps, SelectRef } from './typings';

function InternalSelect(props: SelectProps, ref: Ref<SelectRef>) {
    const groupRef = useRef<HTMLDivElement>(null);

    const { append, prepend } = props;

    if (append || prepend) {
        return (
            <InputGroup prepend={prepend} append={append} ref={groupRef} style={props.style}>
                <SelectCore ref={ref} {...props} />
            </InputGroup>
        );
    } else {
        return <SelectCore ref={ref} {...props} />;
    }
}

const Comp = memo(forwardRef(InternalSelect)) as (props: SelectProps & { ref?: RefObject<SelectProps> | React.ForwardedRef<SelectProps> }) => React.ReactElement;

type InternalType = typeof Comp;

interface CompInterface extends InternalType {
    displayName?: string;
    defaultProps?: Partial<SelectProps>;
    OptionGroup: typeof OptionGroup;
    Option: typeof Option;
}

const Select = Comp as CompInterface;

Select.OptionGroup = OptionGroup;
Select.Option = Option;
Select.displayName = 'Select';

export default Select;
