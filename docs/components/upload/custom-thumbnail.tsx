/* eslint-disable no-console */
import { ElDialog, ElIcon, ElUpload, UploadFile } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [visible, setVisible] = useState(false);

    const handleRemove = (file: UploadFile) => {
        console.log(file);
    };

    const handlePictureCardPreview = (file: UploadFile) => {
        setImageUrl(file.url);
        setVisible(true);
    };

    const handleDownload = (file: UploadFile) => {
        console.log(file);
    };

    return (
        <>
            <ElUpload
                listType="picture-card"
                action="#"
                autoUpload={false}
                formatter={file => (
                    <div>
                        <img className="el-upload-list__item-thumbnail" src={file.url} alt="" />
                        <span className="el-upload-list__item-actions">
                            <span className="el-upload-list__item-preview" onClick={() => handlePictureCardPreview(file)}>
                                <ElIcon name="magnifying-glass-plus" prefix="fal" />
                            </span>
                            <span className="el-upload-list__item-delete" onClick={() => handleDownload(file)}>
                                <ElIcon name="download" prefix="fal" />
                            </span>
                            <span className="el-upload-list__item-delete" onClick={() => handleRemove(file)}>
                                <ElIcon name="trash-alt" prefix="fal" />
                            </span>
                        </span>
                    </div>
                )}
            >
                <ElIcon name="plus" />
            </ElUpload>

            <ElDialog visible={visible} size="large" beforeClose={() => setVisible(false)}>
                <ElDialog.header />
                <ElDialog.body>
                    <img src={imageUrl} alt="Preview Image" />
                </ElDialog.body>
            </ElDialog>
        </>
    );
};

export default App;
