import { ElButton, ElTransfer } from '@qsxy/element-plus-react';
import React from 'react';
import './customizable.scss';

const App = () => {
    const generateData = () => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `Option ${i}`,
                disabled: i % 4 === 0,
            });
        }
        return data;
    };

    const data = generateData();

    const renderFunc = option => <span>{option.label}</span>;

    const handleChange = (value, direction, movedKeys) => {
        console.log(value, direction, movedKeys);
    };
    return (
        <>
            <p style={{ textAlign: 'center', margin: '0 0 20px' }}>Customize data items using render-content</p>
            <div style={{ textAlign: 'center' }}>
                <ElTransfer
                    defaultValue={[1]}
                    style={{ textAlign: 'left' }}
                    filterable
                    leftDefaultChecked={[2, 3]}
                    rightDefaultChecked={[1]}
                    renderContent={renderFunc}
                    titles={['Source', 'Target']}
                    buttonTexts={['To left', 'To right']}
                    format={({ checked, total }) => (checked > 0 ? `${checked}/${total}项` : `${total}项`)}
                    data={data}
                    onChange={handleChange}
                    leftFooter={() => (
                        <ElButton className="transfer-footer" size="small">
                            Operation
                        </ElButton>
                    )}
                    rightFooter={() => (
                        <ElButton className="transfer-footer" size="small">
                            Operation
                        </ElButton>
                    )}
                ></ElTransfer>
            </div>
        </>
    );
};

export default App;
