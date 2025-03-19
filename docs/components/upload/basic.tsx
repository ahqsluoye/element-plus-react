/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElButton, ElMessage, ElMessageBox, ElUpload, UploadProps, UploadUserFile } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [fileList, setFileList] = useState<UploadUserFile[]>([
        {
            name: 'element-plus-logo.svg',
            url: 'https://element-plus.org/images/element-plus-logo.svg',
        },
        {
            name: 'element-plus-logo2.svg',
            url: 'https://element-plus.org/images/element-plus-logo.svg',
        },
    ]);

    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
        console.log(file, uploadFiles);
    };

    const handlePreview: UploadProps['onPreview'] = uploadFile => {
        console.log(uploadFile);
    };

    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
        ElMessage.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`);
    };

    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`, '').then(
            () => true,
            () => false,
        );
    };

    return (
        <ElUpload
            fileList={fileList}
            className="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            // action="http://127.0.0.1:8080/report2/report/bi/graph/upload/img"
            multiple
            onPreview={handlePreview}
            onRemove={handleRemove}
            beforeRemove={beforeRemove}
            limit={3}
            onExceed={handleExceed}
            onProgress={(e, f, list) => {
                console.log(f, list);
            }}
            data={() => ({ name: 'test' })}
            onChange={(_, list) => setFileList(list)}
            tip={<div className="el-upload__tip">jpg/png files with a size less than 500KB.</div>}
        >
            <ElButton type="primary">Click to upload</ElButton>
        </ElUpload>
    );
};

export default App;
