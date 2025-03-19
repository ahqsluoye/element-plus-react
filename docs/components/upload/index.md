---
title: Upload 上传
`boolean` ang: zh-CN
---

# Upload 上传

通过点击或者拖拽上传文件。

## 基础用法

你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `onExceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `beforeRemove` 来阻止文件移除操作。

<code src="./basic.tsx"></code>

## 覆盖前一个文件

设置 `limit` 和 `onExceed` 可以在选中时自动替换上一个文件。

<code src="./limit-cover.tsx"></code>

## 用户头像

在 `beforeUpload` 钩子中限制用户上传文件的格式和大小。

<code src="./avatar.tsx"></code>

## 照片墙

使用 `listType` 属性来设定文件列表的样式。

<code src="./photo-wall.tsx"></code>

## 自定义缩略图

使用 `formatter` 属性来改变默认的缩略图模板样式。

<code src="./custom-thumbnail.tsx"></code>

## 图片列表缩略图

<code src="./file-list-with-thumbnail.tsx"></code>

## 上传文件列表控制

通过 `onChange` 钩子函数来对上传文件的列表进行控制。

<code src="./file-list.tsx"></code>

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

<code src="./drag-and-drop.tsx"></code>

## 手动上传

<code src="./manual.tsx"></code>

## 上传 API

### 属性

| 名称              | 描述                                                                                                                                 | 类型                                                                                                                       | 默认值   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| `action`          | 请求 URL                                                                                                                             | `string`                                                                                                                   | —        |
| `headers`         | 设置上传的请求头部                                                                                                                   | `Headers \| Record<string, any>`                                                                                           | —        |
| `method`          | 设置上传请求方法                                                                                                                     | `string`                                                                                                                   | `'post'` |
| `multiple`        | 是否支持多选文件                                                                                                                     | `boolean`                                                                                                                  | `false`  |
| `data`            | 上传时附带的额外参数                                                                                                                 | `Record<string, any>`                                                                                                      | —        |
| `name`            | 上传的文件字段名                                                                                                                     | `string`                                                                                                                   | `'file'` |
| `withCredentials` | 支持发送 cookie 凭证信息                                                                                                             | `boolean`                                                                                                                  | `false`  |
| `showFileList`    | 是否显示已上传文件列表                                                                                                               | `boolean`                                                                                                                  | `true`   |
| `drag`            | 是否启用拖拽上传                                                                                                                     | `boolean`                                                                                                                  | `false`  |
| `accept`          | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | `string`                                                                                                                   | —        |
| `onPreview`       | 点击文件列表中已上传的文件时的钩子                                                                                                   | <Enum type='Function'>`(uploadFile: UploadFile) => void`</Enum>                                                            | —        |
| `onRemove`        | 文件列表移除文件时的钩子                                                                                                             | <Enum type='Function'>`(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                                  | —        |
| `onSuccess`       | 文件上传成功时的钩子                                                                                                                 | <Enum type='Function'>`(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                   | —        |
| `onError`         | 文件上传失败时的钩子                                                                                                                 | <Enum type='Function'>`(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                    | —        |
| `onProgress`      | 文件上传时的钩子                                                                                                                     | <Enum type='Function'>`(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>        | —        |
| `onChange`        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                                                       | <Enum type='Function'>`(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`</Enum>                                  | —        |
| `onExceed`        | 当超出限制时，执行的钩子函数                                                                                                         | <Enum type='Function'>`(files: File[], uploadFiles: UploadUserFile[]) => void`</Enum>                                      | —        |
| `beforeUpload`    | 上传文件之前的钩子，参数为上传的文件， 若返回`false`或者返回` Promise` 且被 reject，则停止上传。                                     | <Enum type='Function'>`(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>`</Enum> | —        |
| `beforeRemove`    | 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 `false `或者返回 `Promise `且被 reject，则停止删除。                         | <Enum type='Function'>`(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`</Enum>                    | —        |
| `fileList`        | 默认上传文件                                                                                                                         | <Enum type='object'>`UploadUserFile[]`</Enum>                                                                              | `[]`     |
| `listType`        | 文件列表的类型                                                                                                                       | <Enum>`'text' \| 'picture' \| 'picture-card'`</Enum>                                                                       | `'text'` |
| `autoUpload`      | 是否自动上传文件                                                                                                                     | `boolean`                                                                                                                  | `true`   |
| `httpRequest`     | 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求                                                                                      | <Enum type='Function'>`(options: UploadRequestOptions) => XMLHttpRequest \| Promise<unknown>`</Enum>                       | —        |
| `disabled`        | 是否禁用上传                                                                                                                         | `boolean`                                                                                                                  | `false`  |
| `limit`           | 允许上传文件的最大数量                                                                                                               | `number`                                                                                                                   | —        |
| `trigger`         | 触发文件选择框的内容                                                                                                                 | -                                                                                                                          | —        |
| `tip`             | 提示说明文字                                                                                                                         | -                                                                                                                          | —        |

### Ref

| 名称           | 描述                                                         | 类型                                                                                                   |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `abort`        | 取消上传请求                                                 | <Enum type='Function'>`(file: UploadFile) => void`</Enum>                                              |
| `submit`       | 手动上传文件列表                                             | <Enum type='Function'>`() => void`</Enum>                                                              |
| `clearFiles`   | 清空已上传的文件列表（该方法不支持在 `beforeUpload` 中调用） | <Enum type='Function'>`(status?: Array<"ready" \| "uploading" \| "success" \| "fail">) => void`</Enum> |
| `handleStart`  | 手动选择文件                                                 | <Enum type='Function'>`(rawFile: UploadRawFile) => void`</Enum>                                        |
| `handleRemove` | 手动移除文件                                                 | <Enum type='Function'>`(file: UploadFile \| UploadRawFile) => void`</Enum>                             |

### 类型声明

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
