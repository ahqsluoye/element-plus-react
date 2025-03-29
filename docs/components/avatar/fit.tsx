import { AvatarProps, ElAvatar } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const fit: AvatarProps['fit'][] = ['fill', 'contain', 'cover', 'none', 'scale-down'];

const App = () => {
    return (
        <div className="demo-fit">
            {fit.map(item => (
                <div key={item} className="block">
                    <span className="title">{item}</span>
                    <ElAvatar size={100} shape="square" fit={item} src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></ElAvatar>
                </div>
            ))}
        </div>
    );
};

export default App;
