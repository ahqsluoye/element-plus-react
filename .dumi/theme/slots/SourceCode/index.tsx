import { ElScrollbar, ScrollbarRef, isNotEmpty } from '@qsxy/element-plus-react';
import debounce from 'lodash/debounce';
import last from 'lodash/last';
import Prism from 'prismjs';
import React, { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react';

interface Props {
    fileName: string;
    activeName?: string;
    content: {
        type: 'NPM' | 'FILE';
        value: string;
    };
    expand: boolean;
    setHeight: (height: string) => void;
}

const SourceCode: FC<Props> = memo(props => {
    const { fileName, activeName, content, expand, setHeight } = props;

    const scrollbarRef = useRef<ScrollbarRef>(null);
    const highlight = useRef<HTMLDivElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    const fileType = useMemo(() => last(fileName.split('.')), []);

    const setCodeAreaHeight = useCallback(() => {
        if (highlight.current) {
            highlight.current.style.height = expand ? 'auto' : '0px';

            setHeight(expand ? highlight.current.offsetHeight + (isNotEmpty(activeName) ? 45 : 5) + 'px' : '0');
            if (expand) {
                const div = document.createElement('div');
                div.style.height = 'calc(100vh - 140px)';
                document.body.appendChild(div);

                setTimeout(() => {
                    if (highlight.current.offsetHeight > div.clientHeight) {
                        setHeight(div.clientHeight + 'px');
                        if (scrollbarRef.current) {
                            setTimeout(() => {
                                scrollbarRef.current?.update();
                            }, 200);
                        }
                    }
                    document.body.removeChild(div);
                }, 100);
            }
        } else {
            setHeight(expand ? 'calc(100vh - 140px)' : '0');
        }
        // if (preRef.current) {
        // }
        if (scrollbarRef.current) {
            setTimeout(() => {
                scrollbarRef.current?.update();
            }, 200);
        }
    }, [expand]);

    // useEffect(() => {
    //     if (expand && scrollbarRef.current) {
    //         setTimeout(() => {
    //             scrollbarRef.current?.update();
    //         }, 300);
    //     }
    // }, [expand]);

    useEffect(() => {
        if (isNotEmpty(activeName)) {
            if (activeName === fileName) {
                setCodeAreaHeight();
            }
        } else {
            setCodeAreaHeight();
        }
    }, [expand, activeName]);

    const resizeFn = debounce(
        useCallback(() => {
            if (scrollbarRef.current) {
                if (isNotEmpty(activeName)) {
                    if (activeName === fileName) {
                        setTimeout(() => {
                            scrollbarRef.current?.update();
                        }, 200);
                    }
                } else {
                    setTimeout(() => {
                        scrollbarRef.current?.update();
                    }, 200);
                }
            }
        }, [activeName]),
        200,
    );

    useEffect(() => {
        window.addEventListener('resize', resizeFn);
        return () => {
            window.removeEventListener('resize', resizeFn);
        };
    }, []);

    return (
        <ElScrollbar ref={scrollbarRef} showVertical={false}>
            <div className={`language-${fileType}`} ref={highlight}>
                <pre ref={preRef}>
                    <code
                        dangerouslySetInnerHTML={{
                            __html: Prism.highlight(content.value, Prism.languages[fileType], fileType),
                        }}
                    ></code>
                </pre>
            </div>
        </ElScrollbar>
    );
});

export default SourceCode;
