import omit from 'lodash/omit';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useDisabled } from '../hooks';
import UploadContent from './UploadContent';
import { UploadContext } from './UploadContext';
import UploadList from './UploadList';
import { UploadContentProps, UploadContentRef, UploadProps, UploadRef } from './typings';
import { useHandlers } from './use-handlers';

const Upload: React.ForwardRefExoticComponent<UploadProps & React.RefAttributes<any>> = memo(
    forwardRef<UploadRef, UploadProps>((props, ref) => {
        props = {
            action: '#',
            method: 'post',
            name: 'file',
            showFileList: true,
            listType: 'text',
            autoUpload: true,
            ...props,
        };
        const { listType, accept, onPreview, showFileList, formatter, trigger, tip } = props;
        const uploadRef = useRef<UploadContentRef>(null);

        const disabled = useDisabled(props.disabled);
        // @ts-ignore
        const { uploadFiles, setUploadFiles, handleStart, handleError, handleRemove, handleSuccess, handleProgress, abort, submit, clearFiles } = useHandlers(props, uploadRef);

        const isPictureCard = useMemo(() => listType === 'picture-card', [listType]);
        const uploadContentProps = useMemo<UploadContentProps>(
            () => ({
                ...omit(props, 'instance'),
                fileList: uploadFiles,
                onStart: handleStart,
                onProgress: handleProgress,
                onSuccess: handleSuccess,
                onError: handleError,
                onRemove: handleRemove,
            }),
            [handleError, handleProgress, handleRemove, handleStart, handleSuccess, props, uploadFiles],
        );
        useEffect(() => {
            uploadFiles.forEach(({ url }) => {
                if (url?.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            abort,
            submit,
            clearFiles,
            handleStart,
            handleRemove,
        }));

        return (
            <div className={props.className} style={props.style}>
                <UploadContext.Provider value={{ accept }}>
                    {/* 照片墙模式 */}
                    {isPictureCard && showFileList && (
                        <UploadList
                            disabled={disabled}
                            listType={listType}
                            files={uploadFiles}
                            handlePreview={onPreview}
                            onRemove={handleRemove}
                            formatter={formatter}
                            append={
                                <UploadContent ref={uploadRef} {...uploadContentProps}>
                                    {trigger ?? props.children}
                                </UploadContent>
                            }
                        />
                    )}

                    {(!isPictureCard || (isPictureCard && !showFileList)) && (
                        <UploadContent ref={uploadRef} {...uploadContentProps}>
                            {trigger || props.children}
                        </UploadContent>
                    )}

                    {trigger && props.children}
                    {tip}
                    {/* 正常文件列表展示 */}
                    {!isPictureCard && showFileList && (
                        <UploadList
                            disabled={disabled}
                            listType={listType}
                            files={uploadFiles}
                            setUploadFiles={setUploadFiles}
                            handlePreview={onPreview}
                            onRemove={handleRemove}
                            formatter={formatter}
                        />
                    )}
                </UploadContext.Provider>
            </div>
        );
    }),
);

Upload.displayName = 'ElUpload';

export default Upload;
