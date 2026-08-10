import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useResizeObserver } from '@qsxy/element-plus-react/hooks/useResizeObserver';
import React, { memo, use, useCallback, useEffect, useMemo, useRef } from 'react';
import { FormItemContext } from './FormItemContext';
import FieldContext from './InternalFormContext';

export interface FormLabelWrapProps {
    isAutoWidth?: boolean;
    updateAll?: boolean;
    children?: React.ReactNode;
}

const FormLabelWrap: React.FC<FormLabelWrapProps> = memo(props => {
    const { isAutoWidth = false, updateAll = false, children } = props;

    const formContext = use(FieldContext);
    const formItemContext = use(FormItemContext);

    const { computedWidth, setComputedWidth, oldWidthRef } = formItemContext;

    const { be } = useClassNames('form');

    const elRef = useRef<HTMLDivElement>(null);

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
                    oldWidthRef.current = computedWidth;
                    setComputedWidth(newWidth);
                } else if (action === 'remove') {
                    formContext?.deregisterLabelWidth?.(computedWidth);
                }
            }
        },
        [children, isAutoWidth, getLabelWidth, oldWidthRef, computedWidth, setComputedWidth, formContext],
    );

    useEffect(() => {
        updateLabelWidth('update');
        return () => {
            updateLabelWidth('remove');
        };
    }, []);

    useEffect(() => {
        updateLabelWidth('update');
    }, [children]);

    useEffect(() => {
        if (updateAll && formContext?.registerLabelWidth) {
            formContext.registerLabelWidth(computedWidth, oldWidthRef.current);
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
            if (computedWidth === 0) {
                return null;
            }
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
});

FormLabelWrap.displayName = 'ElLabelWrap';

export default FormLabelWrap;
