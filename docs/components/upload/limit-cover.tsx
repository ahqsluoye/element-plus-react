import { ElButton, ElUpload, UploadProps, UploadRawFile, UploadRef, genFileId } from '@qsxy/element-plus-react';
import React, { useRef } from 'react';

const App = () => {
    const uploadRef = useRef<UploadRef>(null);

    const handleExceed: UploadProps['onExceed'] = files => {
        uploadRef.current.clearFiles();
        const file = files[0] as UploadRawFile;
        file.uid = genFileId();
        uploadRef.current.handleStart(file);
    };

    const submitUpload = () => {
        uploadRef.current.submit();
    };

    return (
        <ElUpload
            ref={uploadRef}
            className="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            limit={1}
            onExceed={handleExceed}
            autoUpload={false}
            trigger={<ElButton type="primary">select file</ElButton>}
            tip={<div className="el-upload__tip text-red">limit 1 file, new file will cover the old file</div>}
        >
            <ElButton type="success" onClick={submitUpload} style={{ marginLeft: '0.75rem' }}>
                upload to server
            </ElButton>
        </ElUpload>
    );
};

export default App;
