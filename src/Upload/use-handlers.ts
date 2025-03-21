/* eslint-disable lines-around-comment */
import isNil from 'lodash/isNil';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { genFileId, warning } from '../Util';
import { useControlled, useForceUpdate } from '../hooks';
import { UploadContentProps, UploadContentRef, UploadFile, UploadFiles, UploadProps, UploadRawFile, UploadStatus } from './typings';

const revokeObjectURL = (file: UploadFile) => {
    if (file.url?.startsWith('blob:')) {
        URL.revokeObjectURL(file.url);
    }
};

export const useHandlers = (props: Omit<UploadProps, 'fileList'> & { fileList: UploadFiles }, uploadRef: RefObject<UploadContentRef | undefined>) => {
    const { fileList, listType = 'text', onError, onChange, onProgress, onSuccess, beforeRemove, onRemove } = props;
    const uploadFilesRef = useRef<UploadFiles>();

    // const [uploadFiles, setUploadFiles] = useState(() => {
    //     uploadFilesRef.current = fileList.map(item => {
    //         return { uid: genFileId(), status: 'success', ...item };
    //     });
    //     return uploadFilesRef.current;
    // });
    const [uploadFiles, setUploadFiles, isControlled] = useControlled(fileList, []);

    const { forceUpdate } = useForceUpdate();

    useEffect(() => {
        if (isControlled) {
            uploadFilesRef.current = fileList.map(item => {
                return { uid: genFileId(), status: 'success', ...item };
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileList]);

    useEffect(() => {
        uploadFilesRef.current = uploadFiles;
    }, [uploadFiles]);

    const getFile = useCallback((rawFile: UploadRawFile) => uploadFilesRef.current.find(file => file.uid === rawFile.uid), []);

    const abort = (file: UploadFile) => {
        uploadRef.current?.abort(file);
    };

    const clearFiles = (
        /** @default ['ready', 'uploading', 'success', 'fail'] */
        states: UploadStatus[] = ['ready', 'uploading', 'success', 'fail'],
    ) => {
        uploadFilesRef.current = uploadFiles.filter(row => !states.includes(row.status));
        setUploadFiles(uploadFilesRef.current);
        forceUpdate();
    };

    const handleError: UploadContentProps['onError'] = (err, rawFile) => {
        const file = getFile(rawFile);
        if (!file) {
            return;
        }

        // eslint-disable-next-line no-console
        // console.error(err);
        file.status = 'fail';
        uploadFilesRef.current.splice(uploadFilesRef.current.indexOf(file), 1);
        setUploadFiles(uploadFilesRef.current);
        onError?.(err, file, uploadFilesRef.current);
        forceUpdate();
    };

    const handleProgress: UploadContentProps['onProgress'] = (evt, rawFile) => {
        const file = getFile(rawFile);
        if (!file) {
            return;
        }

        onProgress?.(evt, file, uploadFilesRef.current);
        file.status = 'uploading';
        file.percentage = Math.round(evt.percent);
        forceUpdate();
    };

    const handleSuccess: UploadContentProps['onSuccess'] = (response, rawFile) => {
        const file = getFile(rawFile);
        if (!file) {
            return;
        }

        file.status = 'success';
        file.response = response;
        onSuccess?.(response, file, uploadFilesRef.current);
        onChange?.(file, uploadFilesRef.current);
        forceUpdate();
    };

    const handleStart: UploadContentProps['onStart'] = file => {
        if (isNil(file.uid)) {
            file.uid = genFileId();
        }
        const uploadFile: UploadFile = {
            name: file.name,
            percentage: 0,
            status: 'ready',
            size: file.size,
            raw: file,
            uid: file.uid,
        };
        if (listType === 'picture-card' || listType === 'picture') {
            try {
                uploadFile.url = URL.createObjectURL(file);
            } catch (err: unknown) {
                warning(false, (err as Error).message);
                onError(err as Error, uploadFile, uploadFilesRef.current);
            }
        }
        uploadFilesRef.current = [...uploadFilesRef.current, uploadFile];
        setUploadFiles(uploadFilesRef.current);
        onChange?.(uploadFile, uploadFilesRef.current);
        // forceUpdate();
    };

    const handleRemove: UploadContentProps['onRemove'] = async (file): Promise<void> => {
        const uploadFile = file instanceof File ? getFile(file) : file;
        if (!uploadFile) {
            throw new Error('file to be removed not found');
        }

        const doRemove = (_file: UploadFile) => {
            abort(_file);
            const _fileList = JSON.parse(JSON.stringify(uploadFiles));
            _fileList.splice(_fileList.indexOf(_file), 1);
            uploadFilesRef.current = _fileList;
            onRemove?.(_file, uploadFilesRef.current);
            revokeObjectURL(_file);
            setUploadFiles(uploadFilesRef.current);
            onChange?.(uploadFile, uploadFilesRef.current);
            forceUpdate();
        };

        if (beforeRemove) {
            const before = await beforeRemove(uploadFile, uploadFiles);
            if (before !== false) {
                doRemove(uploadFile);
            }
        } else {
            doRemove(uploadFile);
        }
    };

    const submit = () => {
        uploadFilesRef.current.filter(({ status }) => status === 'ready').forEach(({ raw }) => raw && uploadRef.current?.upload(raw));
    };

    useEffect(() => {
        if (listType !== 'picture-card' && listType !== 'picture') {
            return;
        }

        uploadFilesRef.current = uploadFiles.map(file => {
            const { raw, url } = file;
            if (!url && raw) {
                try {
                    file.url = URL.createObjectURL(raw);
                } catch (err: unknown) {
                    onError?.(err as Error, file, uploadFiles);
                }
            }
            return file;
        });
        setUploadFiles(uploadFilesRef.current);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listType]);

    // useEffect(() => {
    //     uploadFilesRef.current = uploadFiles.map(item => {
    //         return { uid: genFileId(), status: 'success', ...item };
    //     });
    //     setUploadFiles(uploadFilesRef.current);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return {
        /** @description two-way binding ref from props `fileList` */
        uploadFiles,
        setUploadFiles,
        abort,
        clearFiles,
        handleError,
        handleProgress,
        handleStart,
        handleSuccess,
        handleRemove,
        submit,
    };
};
