import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useClassNames } from '../hooks';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { throwError } from '../Util';
import FieldContext from './FieldContext';
import { FormItemContext } from './FormItemContext';

const COMPONENT_NAME = 'ElLabelWrap';

export interface FormLabelWrapProps {
    isAutoWidth?: boolean;
    updateAll?: boolean;
    children?: React.ReactNode;
}

const FormLabelWrap: React.FC<FormLabelWrapProps> = props => {
    const { isAutoWidth = false, updateAll = false, children } = props;

    const formContext = useContext(FieldContext);
    const formItemContext = useContext(FormItemContext);

    if (!formItemContext) {
        throwError(COMPONENT_NAME, 'usage: <Form.Item><FormLabelWrap /></Form.Item>');
    }

    const { be } = useClassNames('form');

    const elRef = useRef<HTMLDivElement>(null);
    const [computedWidth, setComputedWidth] = useState(0);

    const getLabelWidth = useCallback(() => {
        if (elRef.current?.firstElementChild) {
            const width = window.getComputedStyle(elRef.current.firstElementChild).width;
            return Math.ceil(Number.parseFloat(width));
        } else {
            return 0;
        }
    }, []);

    const updateLabelWidth = useCallback(
        (action: 'update' | 'remove' = 'update') => {
            if (children && isAutoWidth) {
                if (action === 'update') {
                    const newWidth = getLabelWidth();
                    setComputedWidth(newWidth);
                } else if (action === 'remove') {
                    formContext?.deregisterLabelWidth?.(computedWidth);
                }
            }
        },
        [children, isAutoWidth, getLabelWidth, formContext, computedWidth],
    );

    useEffect(() => {
        updateLabelWidth('update');
        return () => {
            updateLabelWidth('remove');
        };
    }, []);

    useEffect(() => {
        updateLabelWidth('update');
    }, [children, updateLabelWidth]);

    useEffect(() => {
        if (updateAll && formContext?.registerLabelWidth) {
            formContext.registerLabelWidth(computedWidth, 0);
        }
    }, [computedWidth]);

    const firstChildRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (elRef.current?.firstElementChild) {
            firstChildRef.current = elRef.current.firstElementChild as HTMLElement;
        }
    }, [children]);

    useResizeObserver(firstChildRef, () => {
        updateLabelWidth('update');
    });

    const style = useMemo(() => {
        if (!isAutoWidth) {
            return {};
        }

        const autoLabelWidth = formContext?.autoLabelWidth;
        const hasLabel = formItemContext?.hasLabel;

        if (hasLabel && autoLabelWidth && autoLabelWidth !== 'auto') {
            const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth);
            const labelPosition = formItemContext.labelPosition || formContext.labelPosition;
            const marginPosition = labelPosition === 'left' ? 'marginRight' : 'marginLeft';

            if (marginWidth) {
                return { [marginPosition]: `${marginWidth}px` };
            }
        }
        return {};
    }, [isAutoWidth, computedWidth, formContext, formItemContext]);

    if (!children) {
        return null;
    }

    if (isAutoWidth) {
        return (
            <div ref={elRef} className={be('item', 'label-wrap')} style={style}>
                {children}
            </div>
        );
    } else {
        return <>{children}</>;
    }
};

FormLabelWrap.displayName = COMPONENT_NAME;

export default FormLabelWrap;
