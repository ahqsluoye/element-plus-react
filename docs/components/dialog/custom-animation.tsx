import { ElButton, ElDialog } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import { TransitionProps } from '../../../src/components/Transition/Transition';
import './custom-animation.scss'

const App = () => {
    const [visible, setVisible] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('fade');
    const [isObjectConfig, setIsObjectConfig] = useState(false);

    const transitionConfig = isObjectConfig 
        ? ({
            name: 'dialog-custom-object',
            transitionAppear: true,
            duration: 500,
        } as TransitionProps)
        : `dialog-${currentAnimation}`;

    const openDialog = (type: string) => {
        setCurrentAnimation(type);
        setIsObjectConfig(false);
        setVisible(true);
    };

    const openDialogWithObject = () => {
        setCurrentAnimation('object-config');
        setIsObjectConfig(true);
        setVisible(true);
    };

    return (
        <>
            <ElButton plain onClick={() => openDialog('fade')}>
                Default
            </ElButton>
            <ElButton plain onClick={() => openDialog('scale')}>
                Scale
            </ElButton>
            <ElButton plain onClick={() => openDialog('slide')}>
                Slide
            </ElButton>
            <ElButton plain onClick={() => openDialog('bounce')}>
                Bounce
            </ElButton>
            <ElButton plain onClick={openDialogWithObject}>
                Object Config
            </ElButton>

            <ElDialog
                visible={visible}
                title={`${currentAnimation} Animation Dialog`}
                width="30%"
                close={() => setVisible(false)}
                transitionConfig={transitionConfig}
                className="custom-transition-dialog"
            >
                <ElDialog.body>
                    <div>
                        <p>
                            Current animation: <strong>{currentAnimation}</strong>
                        </p>
                        <p>
                            This dialog demonstrates the {currentAnimation} animation effect.
                        </p>
                        {isObjectConfig && (
                            <p>
                                <strong>Using object configuration:</strong>
                                <br />
                                <code>{JSON.stringify(transitionConfig, null, 2)}</code>
                            </p>
                        )}
                    </div>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton onClick={() => setVisible(false)}>Cancel</ElButton>
                    <ElButton type="primary" onClick={() => setVisible(false)}>
                        Confirm
                    </ElButton>
                </ElDialog.footer>
            </ElDialog>

        </>
    );
};

export default App;
