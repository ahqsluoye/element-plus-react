import { ElLoading } from '@qsxy/element-plus-react';
import { LoremIpsum } from 'lorem-ipsum';
import React, { useMemo, useRef } from 'react';

const App = () => {
    const divRef = useRef<HTMLDivElement>();

    const lorem = useMemo(
        () =>
            new LoremIpsum({
                sentencesPerParagraph: {
                    max: 8,
                    min: 4,
                },
                wordsPerSentence: {
                    max: 16,
                    min: 4,
                },
            }),
        [],
    );
    return (
        <div ref={divRef} style={{ height: 300, padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span>{lorem.generateParagraphs(5)}</span>
            <ElLoading fullscreen={false} target={divRef} visible />
        </div>
    );
};

export default App;
