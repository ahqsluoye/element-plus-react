import { ElIcon, ElMessage, ElUpload, UploadProps } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './avatar.scss';

const App = () => {
    const [imageUrl, setImageUrl] = useState('');

    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        setImageUrl(URL.createObjectURL(uploadFile.raw));
    };

    const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
        if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('Avatar picture must be JPG format!');
            return false;
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('Avatar picture size can not exceed 2MB!');
            return false;
        }
        return true;
    };

    return (
        <ElUpload
            className="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            // action="http://127.0.0.1:8080/report2/report/bi/graph/upload/img"
            multiple
            accept="image/jpeg"
            showFileList={false}
            onSuccess={handleAvatarSuccess}
            beforeUpload={beforeAvatarUpload}
        >
            {imageUrl ? <img v-if="imageUrl" src={imageUrl} className="avatar" /> : <ElIcon name="plus" className="avatar-uploader-icon" />}
        </ElUpload>
    );
};

export default App;
