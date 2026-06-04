import { ElAnchor, ElAnchorLink } from '@qsxy/element-plus-react';
import React, { useRef } from 'react';

const App = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 3 }}>
                <div
                    style={{
                        height: 30,
                        width: '70%',
                        background: '#000',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        color: '#fff',
                    }}
                >
                    Fixed Top Block
                </div>
                <div ref={containerRef} style={{ height: 300, overflowY: 'auto' }}>
                    <div
                        id="part1"
                        style={{
                            height: 300,
                            background: 'rgba(255, 0, 0, 0.02)',
                            marginTop: 30,
                        }}
                    >
                        part1
                    </div>
                    <div
                        id="part2"
                        style={{
                            height: 300,
                            background: 'rgba(0, 255, 0, 0.02)',
                            marginTop: 30,
                        }}
                    >
                        part2
                    </div>
                    <div
                        id="part3"
                        style={{
                            height: 300,
                            background: 'rgba(0, 0, 255, 0.02)',
                            marginTop: 30,
                        }}
                    >
                        part3
                    </div>
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <ElAnchor container={containerRef} direction="vertical" type="default" offset={30} onClick={handleClick}>
                    <ElAnchorLink href="#part1" title="part1" />
                    <ElAnchorLink href="#part2" title="part2" />
                    <ElAnchorLink href="#part3" title="part3" />
                </ElAnchor>
            </div>
        </div>
    );
};

export default App;
