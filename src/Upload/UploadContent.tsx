import classNames from 'classnames';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { genFileId } from '../Util';
import { useClassNames, useDisabled } from '../hooks';
import UploadDrag from './UploadDrag';
import { ajaxUpload } from './ajax';
import { UploadContentProps, UploadContentRef, UploadFile, UploadHooks, UploadRawFile, UploadRequestOptions } from './typings';

const UploadContent = forwardRef<UploadContentRef, UploadContentProps>((props, ref) => {
    const {
        listType,
        drag,
        multiple,
        autoUpload,
        limit,
        accept,
        fileList,
        onStart,
        onExceed,
        headers = {},
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest = ajaxUpload,
        onRemove,
    } = props;
    const { b, e, m, is } = useClassNames('upload');
    const disabled = useDisabled();

    const inputRef = useRef<HTMLInputElement>(null);
    const requests = useRef<Record<string, XMLHttpRequest | Promise<unknown>>>({});

    // const { request: ajax } = useAjax(onProgress, fileList);

    const doUpload = useCallback(
        (rawFile: UploadRawFile) => {
            const { uid } = rawFile;
            const options: UploadRequestOptions = {
                headers: headers || {},
                withCredentials,
                file: rawFile,
                data,
                method,
                filename,
                action,
                onProgress: evt => {
                    onProgress?.(evt, rawFile);
                },
                onSuccess: res => {
                    onSuccess?.(res, rawFile);
                    delete requests.current[uid];
                },
                onError: err => {
                    onError?.(err, rawFile);
                    delete requests.current[uid];
                },
            };

            if (data instanceof Function) {
                const params = data(rawFile);
                if (params instanceof Promise) {
                    params.then(result => {
                        options.data = result;
                        const request = httpRequest(options);
                        requests.current[uid] = request;
                        if (request instanceof Promise) {
                            request.then(options.onSuccess, options.onError);
                        }
                    });
                } else {
                    options.data = params;
                    const request = httpRequest(options);
                    requests.current[uid] = request;
                    if (request instanceof Promise) {
                        request.then(options.onSuccess, options.onError);
                    }
                }
            } else {
                const request = httpRequest(options);
                requests.current[uid] = request;
                if (request instanceof Promise) {
                    request.then(options.onSuccess, options.onError);
                }
            }
        },
        [action, data, filename, headers, httpRequest, method, onError, onProgress, onSuccess, withCredentials],
    );

    const upload = useCallback(
        async (rawFile: UploadRawFile) => {
            if (inputRef.current) {
                inputRef.current.value = '';
            }

            if (!props.beforeUpload) {
                return doUpload(rawFile);
            }

            let hookResult: Exclude<ReturnType<UploadHooks['beforeUpload']>, Promise<any>>;
            try {
                hookResult = await props.beforeUpload(rawFile);
            } catch {
                hookResult = false;
            }

            if (hookResult === false) {
                onRemove?.(rawFile);
                return;
            }

            let file: File = rawFile;
            if (hookResult instanceof Blob) {
                if (hookResult instanceof File) {
                    file = hookResult;
                } else {
                    file = new File([hookResult], rawFile.name, {
                        type: rawFile.type,
                    });
                }
            }

            doUpload(
                Object.assign(file, {
                    uid: rawFile.uid,
                }),
            );
        },
        [doUpload, onRemove, props],
    );

    const uploadFiles = useCallback(
        (files: File[]) => {
            if (files.length === 0) {
                return;
            }

            if (limit && fileList.length + files.length > limit) {
                onExceed?.(files, fileList);
                return;
            }

            if (!multiple) {
                files = files.slice(0, 1);
            }

            for (const file of files) {
                const rawFile = file as UploadRawFile;
                rawFile.uid = genFileId();
                onStart?.(rawFile);
                if (autoUpload) {
                    upload(rawFile);
                }
            }
        },
        [autoUpload, fileList, limit, multiple, onExceed, onStart, upload],
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.stopPropagation();
            const files = (event.target as HTMLInputElement).files;
            if (!files) {
                return;
            }
            uploadFiles(Array.from(files));
        },
        [uploadFiles],
    );

    const handleClick = useCallback(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
        }
    }, [disabled]);

    // const handleKeydown = useCallback(
    //     (event: h.React.TargetedKeyboardEvent<HTMLDivElement>) => {
    //         // if (e.key)   self.enter.space
    //         // eslint-disable-next-line no-console
    //         console.log(event.key);
    //         handleClick();
    //     },
    //     [handleClick],
    // );

    const abort = useCallback((file?: UploadFile) => {
        const _reqs = Object.entries(requests.current).filter(file ? ([uid]) => String(file.uid) === uid : () => true);
        _reqs.forEach(([uid, req]) => {
            if (req instanceof XMLHttpRequest) {
                req.abort();
            }
            delete requests.current[uid];
        });
    }, []);

    useImperativeHandle(ref, () => ({
        abort,
        upload,
    }));

    return (
        <div className={classNames(b(), m(listType), is({ drag }))} onClick={handleClick} /* onKeyDown={handleKeydown} */>
            {drag ? (
                <UploadDrag disabled={disabled} onFiles={uploadFiles}>
                    {props.children}
                </UploadDrag>
            ) : (
                props.children
            )}
            <input ref={inputRef} className={e`input`} name={filename} multiple={multiple} accept={accept} type="file" onChange={handleChange} />
        </div>
    );
});

export default UploadContent;
