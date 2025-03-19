import { ElButton, ElUpload, UploadRef } from '@parker/element-plus-react';
import React, { useRef } from 'react';

const App = () => {
    const uploadRef = useRef<UploadRef>(null);

    const submitUpload = () => {
        uploadRef.current.submit();
    };

    return (
        <ElUpload
            ref={uploadRef}
            className="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            autoUpload={false}
            multiple
            trigger={<ElButton type="primary">select file</ElButton>}
            tip={<div className="el-upload__tip text-red">jpg/png files with a size less than 500kb</div>}
        >
            <ElButton type="success" onClick={submitUpload} style={{ marginLeft: '0.75rem' }}>
                upload to server
            </ElButton>
        </ElUpload>
    );
};

export default App;
