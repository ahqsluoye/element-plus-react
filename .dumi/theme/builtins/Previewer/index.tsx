import pkg from '@/../package.json';
import SourceCode from '@/theme/slots/SourceCode';
import { ElIcon, ElMessage, ElTabPane, ElTabs, ElTooltip, ElTransition } from '@qsxy/element-plus-react';
import stackblitzSdk from '@stackblitz/sdk';
import classNames from 'classnames';
import clipboardCopy from 'clipboard-copy';
import { addClass, removeClass } from 'dom-lib';
import { IPreviewerProps, useLocation } from 'dumi';
import React, { FC, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import getStackblitzConfig from './stackblitzConfig';
import './style.scss';

interface ExtraFile {
    name: 'style' | 'comp1' | 'comp2';
    label: string;
    content: string;
    type: 'jsx' | 'scss' | 'ts';
}

const BlockControl = ({ ref, expand }: { expand: boolean } & { ref?: React.Ref<any | null> }) => {
    const [hovering, setHovering] = useState(false);

    const nodeRef = useRef(null);
    const onMouseEnter = useCallback(() => setHovering(true), []);
    const onMouseLeave = useCallback(() => setHovering(false), []);

    const location = useLocation();
    const isEnglish = useMemo(() => location.pathname.startsWith('/en-US'), [location.pathname]);

    useImperativeHandle(ref, () => ({
        onMouseEnter,
        onMouseLeave,
    }));

    return (
        <>
            <ElIcon prefix="far" name={expand ? 'angle-up' : 'angle-down'} className={classNames({ hovering })} />
            <ElTransition nodeRef={nodeRef} name="text-slide" visible={hovering} display="inline-block">
                <span ref={nodeRef} className="r-link">
                    {expand ? (isEnglish ? 'Hide Source' : '隐藏代码') : isEnglish ? 'Show Source' : '显示代码'}
                </span>
            </ElTransition>
        </>
    );
};

const Previewer: FC<IPreviewerProps> = props => {
    const { title, path, children, asset } = props;
    const [expand, setExpand] = useState(false);
    const [activeName, setActiveName] = useState('');

    const files = Object.entries(asset.dependencies).filter(([, { type }]) => type === 'FILE');
    const meta = useRef(null);
    const control = useRef(null);
    const blockControl = useRef(null);
    const blockControlDown = useRef(null);
    const copyButton = useRef(null);
    const description = useRef(null);
    const highlight = useRef(null);
    const preRef = useRef<HTMLPreElement>(null);
    const location = useLocation();
    const isEnglish = useMemo(() => location.pathname.startsWith('/en-US'), [location.pathname]);

    const scrollParent = useRef(null);
    const codepen = useRef<string>('');

    // const getCodeAreaHeight = () => {
    //     if (description.current) {
    //         return description.current.clientHeight + highlight.current.clientHeight + 20;
    //     }
    //     return highlight.current.clientHeight;
    // };

    const setHeight = useCallback((height: string) => (meta.current.style.height = height), []);

    const copy = useCallback(
        e => {
            e.stopPropagation();
            if (files.length === 1) {
                codepen.current = files[0][1].value;
            } else if (files.length > 1) {
                const index = files.findIndex(([name]) => name === activeName);
                codepen.current = files[index][1].value;
            }
            const res = clipboardCopy(codepen.current);

            res.then(() => {
                ElMessage.success({
                    message: isEnglish ? 'Copied!' : '已复制！',
                });
            }).catch(() => {
                ElMessage.error({
                    message: isEnglish ? 'Browser does not support auto-copy!' : '该浏览器不支持自动复制！',
                });
            });
        },
        [files, activeName, isEnglish],
    );

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
        } else {
            blockControlDown.current?.onMouseEnter();
        }
        // setTimeout(() => {
        //     scrollParent.current = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
        //     scrollParent?.current.addEventListener('scroll', scrollHandler);
        //     scrollHandler();
        // }, 200);
    }, [expand]);

    const runtimeDependencies = {
        // ...Object.keys(props.asset.dependencies).reduce((prev, item) => {
        //     if (item.type === 'NPM') {
        //         prev[item] = props.asset.dependencies[item].value;
        //     }
        //     return prev;
        // }, {}),
        ...pkg.dependencies,
        'react-router-dom': '6.22.1',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        [pkg.name]: pkg.version,
    };

    const stackblitzPrefillConfig = getStackblitzConfig({
        title: `@qsxy/element-plus-react@${pkg.version}`,
        dependencies: runtimeDependencies,
        devDependencies: {
            'react-router-dom': '6.22.1',
            react: '^19.0.0',
            'react-dom': '^19.0.0',
            [pkg.name]: pkg.version,
        },
        props,
    });

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
                onMouseEnter={() => {
                    if (!expand) {
                        blockControl.current?.onMouseEnter();
                    }
                }}
                onMouseLeave={() => blockControl.current?.onMouseLeave()}
            >
                <div className="source">
                    <div className="example-showcase">{children}</div>
                </div>
                <div ref={control} className={classNames('demo-block-control')} onClick={() => setExpand(!expand)}>
                    <BlockControl ref={blockControl} expand={expand} />
                    <div className="control-button-container">
                        <ElTooltip content={isEnglish ? 'Open in Stackblitz' : '在 Stackblitz 中打开'} placement="top">
                            <span
                                className="control-button copy-button"
                                onClick={e => {
                                    e.stopPropagation();
                                    stackblitzSdk.openProject(stackblitzPrefillConfig, {
                                        openFile: [`src/demo.tsx`],
                                    });
                                }}
                            >
                                <ElIcon name="bolt-lightning" prefix="far" />
                            </span>
                        </ElTooltip>
                        <ElTooltip content={isEnglish ? 'Copy Code' : '复制代码'} placement="top">
                            <span ref={copyButton} className="control-button copy-button" onClick={copy}>
                                <ElIcon name="paste" prefix="far" />
                            </span>
                        </ElTooltip>
                    </div>
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
                                    label={item[0]}
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
                {expand && (
                    <div className={classNames('demo-block-control')} onClick={() => setExpand(!expand)}>
                        <BlockControl ref={blockControlDown} expand />
                    </div>
                )}
            </div>
        </>
    );
};

export default Previewer;
