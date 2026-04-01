import classNames from 'classnames';
import React, { useCallback, useContext, useState } from 'react';
import { useClassNames } from '../hooks';
import { BaseProps } from '../types/common';
import { UploadContext } from './UploadContext';

interface Props extends BaseProps {
    disabled?: boolean;
    onFiles?: (files: File[]) => void;
}

const UploadDrag = ({ disabled, onFiles, children }: Props) => {
    const { b, is } = useClassNames('upload');
    const { accept } = useContext(UploadContext);

    const [dragover, setDragover] = useState(false);

    const onDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (disabled) {
                return;
            }
            setDragover(false);

            const files = Array.from(e.dataTransfer?.files);
            if (!accept) {
                onFiles?.(files);
                return;
            }

            const filesFiltered = files.filter(file => {
                const { type, name } = file;
                const extension = name.includes('.') ? `.${name.split('.').pop()}` : '';
                const baseType = type.replace(/\/.*$/, '');
                return accept
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item)
                    .some(acceptedType => {
                        if (acceptedType.startsWith('.')) {
                            return extension === acceptedType;
                        }
                        if (/\/\*$/.test(acceptedType)) {
                            return baseType === acceptedType.replace(/\/\*$/, '');
                        }
                        if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
                            return type === acceptedType;
                        }
                        return false;
                    });
            });

            onFiles?.(filesFiltered);
        },
        [accept, disabled, onFiles],
    );

    const onDragover = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!disabled) {
                setDragover(true);
            }
        },
        [disabled],
    );

    return (
        <div
            className={classNames(b`dragger`, is({ dragover }))}
            onDrop={onDrop}
            onDragOver={onDragover}
            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setDragover(false);
            }}
        >
            {children}
        </div>
    );
};

export default UploadDrag;
