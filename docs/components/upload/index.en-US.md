---
title: Upload
lang: en-US
---

<Meta></Meta>

# Upload

Upload files by clicking or drag-and-drop.

## Basic Usage

You can pass custom upload button types and text prompts. Set `limit` and `onExceed` to restrict the number of uploaded files and define the behavior when the limit is exceeded. Set `beforeRemove` to prevent file removal.

<code src="./basic.tsx"></code>

## Cover Previous File

Setting `limit` and `onExceed` can automatically replace the previous file when selecting a new one.

<code src="./limit-cover.tsx"></code>

## User Avatar

Use the `beforeUpload` hook to restrict the format and size of uploaded files.

<code src="./avatar.tsx"></code>

## Photo Wall

Use the `listType` property to set the file list style.

<code src="./photo-wall.tsx"></code>

## Custom Thumbnail

Use the `formatter` property to change the default thumbnail template style.

<code src="./custom-thumbnail.tsx"></code>

## File List with Thumbnails

<code src="./file-list-with-thumbnail.tsx"></code>

## File List Control

Use the `onChange` hook function to control the upload file list.

<code src="./file-list.tsx"></code>

## Drag to Upload

You can drag files to a specific area to upload them.

<code src="./drag-and-drop.tsx"></code>

## Manual Upload

<code src="./manual.tsx"></code>

## Upload API

### Properties

| Name            | Description                                                                                                                            | Type                                                                                                                      | Default  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| action          | Request URL                                                                                                                            | `string`                                                                                                                  | —        |
| headers         | Set request headers for upload                                                                                                         | `Headers \| Record<string, any>`                                                                                          | —        |
| method          | Set upload request method                                                                                                              | <Enum>'post' \| 'get'</Enum>                                                                                              | `'post'` |
| multiple        | Whether to support multiple file upload                                                                                                | `boolean`                                                                                                                 | `false`  |
| data            | Additional parameters attached during upload                                                                                           | `Record<string, any> \| ((rawFile: UploadRawFile) => Promise<Record<string, any>>) \| ((rawFile: UploadRawFile) => Record<string, any>)` | —        |
| name            | Field name for the uploaded file                                                                                                       | `string`                                                                                                                  | `'file'` |
| withCredentials | Whether to send cookie credentials                                                                                                     | `boolean`                                                                                                                 | `false`  |
| errorStatus     | Custom error judgment for upload requests                                                                                              | <Enum type='Function'>`(xhr: XMLHttpRequest) => boolean`</Enum>                                                           | —        |
| showFileList    | Whether to show the uploaded file list                                                                                                 | `boolean`                                                                                                                 | `true`   |
| drag            | Whether to enable drag-and-drop upload                                                                                                 | `boolean`                                                                                                                 | `false`  |
| accept          | Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) (invalid in thumbnail-mode)          | `string`                                                                                                                  | —        |
| onPreview       | Hook when clicking an uploaded file in the file list                                                                                   | <Enum type='Function'>`(uploadFile: UploadFile) => void`</Enum>                                                           | —        |
| onRemove        | Hook when a file is removed from the file list                                                                                          | <Enum type='Function'>`(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                                 | —        |
| onSuccess       | Hook when file upload succeeds                                                                                                         | <Enum type='Function'>`(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                  | —        |
| onError         | Hook when file upload fails                                                                                                            | <Enum type='Function'>`(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                    | —        |
| onProgress      | Hook during file upload                                                                                                                | <Enum type='Function'>`(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>        | —        |
| onChange        | Hook when file status changes, called when files are added, upload succeeds, or upload fails                                          | <Enum type='Function'>`(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                                 | —        |
| onExceed        | Hook function executed when the limit is exceeded                                                                                     | <Enum type='Function'>`(files: File[], uploadFiles: UploadUserFile[]) => void`</Enum>                                     | —        |
| beforeUpload    | Hook before uploading a file. Parameters is the file to be uploaded. If `false` is returned or a `Promise` is returned and rejected, the upload is stopped. | <Enum type='Function'>`(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>`</Enum> | —        |
| beforeRemove    | Hook before deleting a file. Parameters are the file and file list. If `false` is returned or a `Promise` is returned and rejected, the deletion is stopped. | <Enum type='Function'>`(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`</Enum>                  | —        |
| fileList        | Default uploaded files                                                                                                                 | <Enum type='object'>`UploadUserFile[]`</Enum>                                                                             | `[]`     |
| listType        | Type of file list                                                                                                                      | <Enum>`'text' \| 'picture' \| 'picture-card'`</Enum>                                                                      | `'text'` |
| autoUpload      | Whether to automatically upload files                                                                                                  | `boolean`                                                                                                                 | `true`   |
| httpRequest     | Override the default Xhr behavior, allowing custom implementation of file upload requests                                               | <Enum type='Function'>`(options: UploadRequestOptions) => XMLHttpRequest \| Promise<unknown>`</Enum>                      | —        |
| disabled        | Whether to disable upload                                                                                                               | `boolean`                                                                                                                 | `false`  |
| limit           | Maximum number of files allowed to be uploaded                                                                                           | `number`                                                                                                                  | —        |
| formatter       | Content of the thumbnail template                                                                                                       | <Enum type='Function'>`(file: UploadFile) => React.ReactElement`</Enum>                                                   | —        |
| trigger         | Content that triggers the file selector                                                                                                 | -                                                                                                                         | —        |
| tip             | Tip text                                                                                                                                | -                                                                                                                         | —        |

### Ref

| Name         | Description                                                         | Type                                                                                                   |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| abort        | Cancel upload request                                               | <Enum type='Function'>`(file: UploadFile) => void`</Enum>                                              |
| submit       | Manually upload file list                                           | <Enum type='Function'>`() => void`</Enum>                                                              |
| clearFiles   | Clear the uploaded file list (this method is not supported in `beforeUpload`) | <Enum type='Function'>`(status?: Array<"ready" \| "uploading" \| "success" \| "fail">) => void`</Enum> |
| handleStart  | Manually select file                                                | <Enum type='Function'>`(rawFile: UploadRawFile) => void`</Enum>                                        |
| handleRemove | Manually remove file                                                | <Enum type='Function'>`(file: UploadFile \| UploadRawFile) => void`</Enum>                             |

### Type Declarations

```typescript
type UploadFiles = UploadFile[];

type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> & Partial<Pick<UploadFile, 'status' | 'uid'>>;

type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';

type Awaitable<T> = Promise<T> | T;

interface UploadFile {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size?: number;
    response?: unknown;
    uid: number;
    url?: string;
    raw?: UploadRawFile;
}

interface UploadProgressEvent extends ProgressEvent {
    percent: number;
}

interface UploadRawFile extends File {
    uid: number;
}

interface UploadRequestOptions {
    action: string;
    method: string;
    data: Record<string, string | Blob | [string | Blob, string]>;
    filename: string;
    file: File;
    headers: Headers | Record<string, string | number | null | undefined>;
    onError: (evt: UploadAjaxError) => void;
    onProgress: (evt: UploadProgressEvent) => void;
    onSuccess: (response: any) => void;
    withCredentials: boolean;
}
```