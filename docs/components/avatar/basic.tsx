import { AvatarProps, ElAvatar, ElCol, ElRow } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
const sizeList: AvatarProps['size'][] = ['small', '', 'large'];

const App = () => {
    return (
        <ElRow className="demo-avatar demo-basic">
            <ElCol span={12}>
                <div className="sub-title">circle</div>
                <div className="demo-basic--circle">
                    <div className="block">
                        <ElAvatar size={50} src={circleUrl} />
                    </div>
                    {sizeList.map(size => (
                        <div key={size} className="block">
                            <ElAvatar size={size} src={circleUrl} />
                        </div>
                    ))}
                </div>
            </ElCol>
            <ElCol span={12}>
                <div className="sub-title">square</div>
                <div className="demo-basic--circle">
                    <div className="block">
                        <ElAvatar shape="square" size={50} src={squareUrl} />
                    </div>
                    {sizeList.map(size => (
                        <div key={size} className="block">
                            <ElAvatar shape="square" size={size} src={squareUrl} />
                        </div>
                    ))}
                </div>
            </ElCol>
        </ElRow>
    );
};

export default App;
