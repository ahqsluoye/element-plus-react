import { ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber, ElSlider, ElSpace, ElWatermark } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [content, setContent] = useState('Element Plus');
    const [fontColor, setFontColor] = useState('rgba(0, 0, 0, 0.15)');
    const [fontSize, setFontSize] = useState(16);
    const [zIndex, setZIndex] = useState(-1);
    const [rotate, setRotate] = useState(-22);
    const [gap0, setGap0] = useState(100);
    const [gap1, setGap1] = useState(100);
    const [offset0, setOffset0] = useState<number>(0);
    const [offset1, setOffset1] = useState<number>(0);

    return (
        <div style={{ display: 'flex' }}>
            <ElWatermark
                className="watermark"
                content={content}
                font={{
                    fontSize,
                    color: fontColor,
                }}
                zIndex={zIndex}
                rotate={rotate}
                gap={[gap0, gap1]}
                offset={[offset0, offset1]}
                style={{ display: 'flex', flex: 'auto' }}
            >
                <div style={{ flex: 'auto' }}>
                    <h1>Element Plus</h1>
                    <h2>A Vue 3 based component library for designers and developers</h2>
                    <img
                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        alt="示例图片"
                        style={{ zIndex: 10, width: '100%', maxWidth: '300px', position: 'relative' }}
                    />
                </div>
            </ElWatermark>
            <ElForm labelPosition="top" labelWidth="50px" style={{ width: '330px', marginLeft: '20px', borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                <ElFormItem label="Content">{() => <ElInput value={content} onChange={v => setContent(String(v))} />}</ElFormItem>
                <ElFormItem label="Color">{() => <ElColorPicker value={fontColor} onChange={v => setFontColor(String(v))} showAlpha />}</ElFormItem>
                <ElFormItem label="FontSize">{() => <ElSlider value={fontSize} onChange={v => setFontSize(Number(v))} />}</ElFormItem>
                <ElFormItem label="zIndex">{() => <ElSlider value={zIndex} onChange={v => setZIndex(Number(v))} />}</ElFormItem>
                <ElFormItem label="Rotate">{() => <ElSlider value={rotate} onChange={v => setRotate(Number(v))} min={-180} max={180} />}</ElFormItem>
                <ElFormItem label="Gap">
                    {() => (
                        <ElSpace>
                            <ElInputNumber value={gap0} onChange={v => setGap0(Number(v))} controlsPosition="right" />
                            <ElInputNumber value={gap1} onChange={v => setGap1(Number(v))} controlsPosition="right" />
                        </ElSpace>
                    )}
                </ElFormItem>
                <ElFormItem label="Offset">
                    {() => (
                        <ElSpace>
                            <ElInputNumber value={offset0} onChange={v => setOffset0(Number(v))} placeholder="offsetLeft" controlsPosition="right" />
                            <ElInputNumber value={offset1} onChange={v => setOffset1(Number(v))} placeholder="offsetTop" controlsPosition="right" />
                        </ElSpace>
                    )}
                </ElFormItem>
            </ElForm>
        </div>
    );
};

export default App;
