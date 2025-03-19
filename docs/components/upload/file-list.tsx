/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElButton, ElUpload, UploadProps, UploadUserFile } from '@parker/element-plus-react';
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

    const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
        setFileList(fileList.slice(-3));
    };

    return (
        <ElUpload
            fileList={fileList}
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            onChange={handleChange}
            tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
        >
            <ElButton type="primary">Click to upload</ElButton>
        </ElUpload>
    );
};

export default App;
