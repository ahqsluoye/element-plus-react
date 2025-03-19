/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElButton, ElUpload, UploadProps, UploadUserFile } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [fileList, setFileList] = useState<UploadUserFile[]>([
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
    ]);

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles);
    };

    const handlePreview: UploadProps['onPreview'] = file => {
        console.log(file);
    };

    return (
        <ElUpload
            fileList={fileList}
            className="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            listType="picture"
            onPreview={handlePreview}
            onRemove={handleRemove}
            onChange={(_, list) => setFileList(list)}
            tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
        >
            <ElButton type="primary">Click to upload</ElButton>
        </ElUpload>
    );
};

export default App;
