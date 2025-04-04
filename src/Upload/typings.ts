import React from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface UploadBaseProps {
    /** 请求 URL */
    action: string;
    /** 设置上传的请求头部 */
    headers?: Headers | Record<string, any>;
    /** 设置上传请求方法 */
    method?: 'post' | 'get';
    /** 是否支持多选文件 */
    multiple?: boolean;
    /** 上传时附带的额外参数 */
    data?: Record<string, any> | ((rawFile: UploadRawFile) => Promise<Record<string, any>>) | ((rawFile: UploadRawFile) => Record<string, any>);
    /** 上传的文件字段名 */
    name?: string;
    /** 是否启用拖拽上传 */
    drag?: boolean;
    /** 支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /** 是否显示已上传文件列表 */
    showFileList?: boolean;
    /** 接受上传的文件类型 */
    accept?: string;
    type?: string;
    /** 默认上传文件 */
    fileList?: UploadUserFile[];
    /** 文件列表的类型 */
    listType?: 'text' | 'picture' | 'picture-card';
    /** 是否自动上传文件 */
    autoUpload?: boolean;
    /** 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求 */
    httpRequest?: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>;
    /** 是否禁用上传 */
    disabled?: boolean;
    /** 允许上传文件的最大数量 */
    limit?: number;
}

export interface UploadHooks {
    /** 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。 */
    beforeUpload?: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
    /** 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。 */
    beforeRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>;
    /** 文件列表移除文件时的钩子 */
    onRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    /** 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 */
    onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    /** 点击文件列表中已上传的文件时的钩子 */
    onPreview?: (uploadFile: UploadFile) => void;
    /** 文件上传成功时的钩子 */
    onSuccess?: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    /** 文件上传时的钩子 */
    onProgress?: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    /** 文件上传失败时的钩子 */
    onError?: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    /** 当超出限制时，执行的钩子函数 */
    onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void;
}

export interface UploadContentProps extends UploadBaseProps, BaseProps {
    beforeUpload?: UploadHooks['beforeUpload'];
    onRemove?: (file: UploadFile | UploadRawFile) => void;
    /** 手动选择文件 */
    onStart?: (rawFile: UploadRawFile) => void;
    onSuccess?: (response: any, rawFile: UploadRawFile) => unknown;
    onProgress?: (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
    onError?: (err: UploadAjaxError, rawFile: UploadRawFile) => void;
    onExceed?: UploadHooks['onExceed'];
}

export interface UploadContentRef {
    abort: (file?: UploadFile) => void;
    upload: (rawFile: UploadRawFile) => Promise<void>;
}

export interface UploadRef {
    /** 取消上传请求 */
    abort: (file?: UploadFile) => void;
    /** 手动上传文件列表 */
    submit: () => void;
    /** 清空已上传的文件列表（该方法不支持在 before-upload 中调用） */
    clearFiles: (status?: Array<'ready' | 'uploading' | 'success' | 'fail'>) => void;
    /** 手动选择文件 */
    handleStart: (rawFile: UploadRawFile) => void;
    /** 手动移除文件。 file 和rawFile 已被合并。 rawFile 将在 v2.2.0 中移除 */
    handleRemove: (file: UploadFile | UploadRawFile) => void;
}

export interface UploadProps extends UploadBaseProps, UploadHooks, BaseProps, NativeProps {
    /** 缩略图模板的内容 */
    formatter?: (file: UploadFile) => React.ReactElement;
    /** 触发文件选择框的内容 */
    trigger?: React.ReactElement;
    /** 提示说明文字 */
    tip?: React.ReactElement;
}

export interface UploadListProps {
    files?: UploadFiles;
    setUploadFiles?: (files?: UploadFiles) => void;
    disabled?: boolean;
    handlePreview?: UploadHooks['onPreview'];
    listType?: 'text' | 'picture' | 'picture-card';
    onRemove?: (file: UploadFile | UploadRawFile) => void;
    formatter?: (file: UploadFile) => React.ReactElement;
    append?: React.ReactElement;
}

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
export interface UploadProgressEvent extends ProgressEvent {
    percent: number;
}

export interface UploadRequestOptions {
    action: string;
    method: string;
    data: Record<string, any> | (() => Promise<Record<string, any>>);
    filename: string;
    file: File;
    headers: Headers | Record<string, string | number | null | undefined>;
    onError: (evt: UploadAjaxError) => void;
    onProgress: (evt: UploadProgressEvent) => void;
    onSuccess: (response: any) => void;
    withCredentials: boolean;
}

export interface UploadProgressEvent extends ProgressEvent {
    percent: number;
}

export interface UploadFile {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size?: number;
    response?: unknown;
    uid: number;
    url?: string;
    raw?: UploadRawFile;
}
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> & Partial<Pick<UploadFile, 'status' | 'uid'>>;

export type UploadFiles = UploadFile[];
export interface UploadRawFile extends File {
    uid: number;
}

export type UploadRequestHandler = (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>;

export class UploadAjaxError extends Error {
    name = 'UploadAjaxError';
    status: number;
    method: string;
    url: string;

    constructor(message: string, status: number, method: string, url: string) {
        super(message);
        this.status = status;
        this.method = method;
        this.url = url;
    }
}

export type Awaitable<T> = Promise<T> | T;
