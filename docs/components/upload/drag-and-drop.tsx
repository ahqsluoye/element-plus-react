import { ElIcon, ElUpload } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElUpload
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            drag
            multiple
            tip={<div className="el-upload__tip">jpg/png files with a size less than 500kb</div>}
        >
            <ElIcon className="el-icon--upload" name="cloud-arrow-up" prefix="fad" />
            <div className="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
        </ElUpload>
    );
};

export default App;
