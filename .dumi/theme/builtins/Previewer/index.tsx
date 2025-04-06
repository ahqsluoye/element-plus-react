import SourceCode from '@/theme/slots/SourceCode';
import { ElIcon, ElTabPane, ElTabs, ElTooltip, ElTransition } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import { IPreviewerProps, openCodeSandbox } from 'dumi';
import React, { FC, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './style.scss';

interface ExtraFile {
    name: 'style' | 'comp1' | 'comp2';
    label: string;
    content: string;
    type: 'jsx' | 'scss' | 'ts';
}

const BlockControl = forwardRef<any, { expand: boolean }>(({ expand }, ref) => {
    const [hovering, setHovering] = useState(false);

    const nodeRef = useRef(null);
    const onMouseEnter = useCallback(() => setHovering(true), []);
    const onMouseLeave = useCallback(() => setHovering(false), []);

    useImperativeHandle(ref, () => ({
        onMouseEnter,
        onMouseLeave,
    }));

    return (
        <>
            <ElIcon prefix="far" name={expand ? 'angle-up' : 'angle-down'} className={classNames({ hovering })} />
            <ElTransition nodeRef={nodeRef} name="text-slide" visible={hovering} display="inline-block">
                <span ref={nodeRef} className="r-link">
                    {expand ? '隐藏代码' : '显示代码'}
                </span>
            </ElTransition>
        </>
    );
});

const Previewer: FC<IPreviewerProps> = props => {
    const { path, children, asset } = props;
    const [expand, setExpand] = useState(false);
    const [activeName, setActiveName] = useState('');

    const files = Object.entries(asset.dependencies).filter(([, { type }]) => type === 'FILE');
    const meta = useRef(null);
    const control = useRef(null);
    const blockControl = useRef(null);
    const copyButton = useRef(null);
    const description = useRef(null);
    const highlight = useRef(null);
    const preRef = useRef<HTMLPreElement>(null);

    const scrollParent = useRef(null);
    const codepen = useRef<string[]>([]);

    // const getCodeAreaHeight = () => {
    //     if (description.current) {
    //         return description.current.clientHeight + highlight.current.clientHeight + 20;
    //     }
    //     return highlight.current.clientHeight;
    // };

    const setHeight = useCallback((height: string) => (meta.current.style.height = height), []);

    const copy = useCallback(e => {
        e.stopPropagation();
        // const res = clipboardCopy(codepen.current.join(''));

        // res.then(() => {
        //     Message.success({
        //         message: '已复制！',
        //     });
        // }).catch(() => {
        //     Message.error({
        //         message: '该浏览器不支持自动复制！',
        //     });
        // });
    }, []);

    const scrollHandler = useCallback(() => {
        const { top, bottom, left } = meta.current.getBoundingClientRect();
        const controlBarHeight = 44;
        const fixedControl = bottom + controlBarHeight > document.documentElement.clientHeight && top <= document.documentElement.clientHeight;
        if (fixedControl) {
            addClass(control.current, 'is-fixed');
        } else {
            removeClass(control.current, 'is-fixed');
        }
        control.current.style.left = fixedControl ? `${left}px` : '0';
    }, []);

    const removeScrollHandler = useCallback(() => {
        scrollParent?.current && scrollParent?.current.removeEventListener('scroll', scrollHandler);
    }, [scrollHandler]);

    useEffect(() => {
        if (!expand) {
            removeClass(control.current, 'is-fixed');
            control.current.style.left = '0';
            removeScrollHandler();
            return;
        }
        // setTimeout(() => {
        //     scrollParent.current = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
        //     scrollParent?.current.addEventListener('scroll', scrollHandler);
        //     scrollHandler();
        // }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expand]);

    return (
        <>
            {/* {props.title && <h3>{props.title}</h3>}
            {props.content && <p dangerouslySetInnerHTML={{ __html: props.content.replace(/`([^`]*)`/g, '<code>$1</code>') }}></p>}
            {props.tip && (
                <div className="tip">
                    <p dangerouslySetInnerHTML={{ __html: props.tip.replace(/`([^`]*)`/g, '<code>$1</code>') }}></p>
                </div>
            )}
            {props.warning && (
                <div className="warning">
                    <p dangerouslySetInnerHTML={{ __html: props.warning.replace(/`([^`]*)`/g, '<code>$1</code>') }}></p>
                </div>
            )} */}
            <div
                className={classNames('demo-block', 'demo-zh-CN', `demo-${path}` /* , { hover: hovering } */)}
                onMouseEnter={() => blockControl.current.onMouseEnter()}
                onMouseLeave={() => blockControl.current.onMouseLeave()}
            >
                <div className="source">
                    <div className="r-demo-source">{children}</div>
                </div>
                <div ref={meta} className="meta">
                    {props.description && (
                        <div className="description" ref={description}>
                            {props.description}
                        </div>
                    )}
                    {files?.length > 1 ? (
                        <ElTabs
                            headerStyle={{ padding: '0 10px' }}
                            className="r-doc-demo-tab r-height-100"
                            style={{ '--el-tabs-header-margin-bottom': '0px' }}
                            contentStyle={{ height: 'calc(100% - 40px)' }}
                        >
                            {files.map(item => (
                                <ElTabPane
                                    key={item[0]}
                                    name={item[0]}
                                    title={item[0]}
                                    onTabShow={() => {
                                        setActiveName(item[0]);
                                    }}
                                    className="r-height-100"
                                >
                                    <SourceCode fileName={item[0]} content={item[1]} expand={expand} activeName={activeName} setHeight={setHeight} />
                                </ElTabPane>
                            ))}
                        </ElTabs>
                    ) : (
                        <SourceCode fileName={files[0][0]} content={files[0][1]} expand={expand} setHeight={setHeight} />
                    )}
                </div>
                <div ref={control} className={classNames('demo-block-control')} onClick={() => setExpand(!expand)}>
                    <BlockControl ref={blockControl} expand={expand} />
                    <div className="control-button-container">
                        <ElTooltip content="在 CodeSandbox 中打开" placement="top">
                            <span
                                className="control-button copy-button"
                                onClick={e => {
                                    e.stopPropagation();
                                    openCodeSandbox({
                                        asset: {
                                            ...props.asset,
                                            dependencies: {
                                                ...props.asset.dependencies,
                                                ['index.tsx']: {
                                                    type: 'FILE',
                                                    value: "import '@qsxy/element-plus-react/dist/index.css';\n" + props.asset.dependencies['index.tsx'].value,
                                                },
                                            },
                                        },
                                    });
                                }}
                            >
                                <ElIcon name="box-open-full" prefix="far" />
                            </span>
                        </ElTooltip>
                        <ElTooltip content="复制代码" placement="top">
                            <span ref={copyButton} className="control-button copy-button" onClick={copy}>
                                <ElIcon name="paste" prefix="far" />
                            </span>
                        </ElTooltip>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Previewer;
