import { ElButton, ElCard, ElCol, ElRow } from '@qsxy/element-plus-react';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import './with-images.scss';

const App = () => {
    const currentDate = useMemo(() => dayjs(new Date()).format(), []);

    return (
        <ElRow>
            {new Array(2).fill('').map((o, index) => (
                <ElCol key={index} span={8} offset={index > 0 ? 2 : 0}>
                    <ElCard bodyStyle={{ padding: 0 }} style={{ maxWidth: 480 }}>
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" className="image" />
                        <div style={{ padding: 14 }}>
                            <span>Yummy hamburger</span>
                            <div className="bottom">
                                <time className="time">{currentDate}</time>
                                <ElButton text className="button">
                                    Operating
                                </ElButton>
                            </div>
                        </div>
                    </ElCard>
                </ElCol>
            ))}
        </ElRow>
    );
};

export default App;
