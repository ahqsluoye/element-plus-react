import { ElDialog, ElIcon, ElUpload, UploadProps, UploadUserFile } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [fileList, setFileList] = useState<UploadUserFile[]>([
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'plant-1.png',
            url: '../images/plant-1.png',
        },
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'plant-2.png',
            url: '../images/plant-2.png',
        },
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'figure-1.png',
            url: '../images/figure-1.png',
        },
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'figure-2.png',
            url: '../images/figure-2.png',
        },
    ]);

    const [imageUrl, setImageUrl] = useState('');
    const [visible, setVisible] = useState(false);

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles);
    };

    const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
        setImageUrl(uploadFile.url);
        setVisible(true);
    };

    return (
        <>
            <ElUpload
                fileList={fileList}
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                // action="http://127.0.0.1:8080/report2/report/bi/graph/upload/img"
                listType="picture-card"
                onPreview={handlePictureCardPreview}
                onRemove={handleRemove}
                onChange={(_, list) => setFileList(list)}
                style={{ width: 780 }}
            >
                <ElIcon name="plus" />
            </ElUpload>

            <ElDialog visible={visible} close={() => setVisible(false)}>
                <ElDialog.body>
                    <img src={imageUrl} alt="Preview Image" />
                </ElDialog.body>
            </ElDialog>
        </>
    );
};

export default App;
