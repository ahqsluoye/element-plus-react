import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getClips, getMarkSize, getPixelRatio, getStyleStr, reRendering } from './helper';
import type { WatermarkFontType, WatermarkProps } from './typings';

/**
 * @description 获取字体样式的默认值，返回必填字段的字体配置
 * @param font - 可选的字体配置
 * @returns 填充默认值后的完整字体配置
 */
function getFontConfig(font?: WatermarkFontType): Required<NonNullable<WatermarkFontType>> {
    return {
        color: font?.color ?? 'rgba(0,0,0,.15)',
        fontSize: font?.fontSize ?? 16,
        fontWeight: font?.fontWeight ?? 'normal',
        fontStyle: font?.fontStyle ?? 'normal',
        fontFamily: font?.fontFamily ?? 'sans-serif',
        fontGap: font?.fontGap ?? 3,
        textAlign: font?.textAlign ?? 'center',
        textBaseline: font?.textBaseline ?? 'hanging',
    };
}

const Watermark = memo(
    forwardRef<HTMLDivElement, WatermarkProps>((props, ref) => {
        const { zIndex = 9, rotate = -22, content = 'Element Plus', width, height, image, font, gap = [100, 100], offset, className, style, children } = props;

        const fontConfig = useMemo(() => getFontConfig(font), [font]);
        const gapX = useMemo(() => gap[0], [gap]);
        const gapY = useMemo(() => gap[1], [gap]);
        const gapXCenter = useMemo(() => gapX / 2, [gapX]);
        const gapYCenter = useMemo(() => gapY / 2, [gapY]);
        const offsetLeft = useMemo(() => offset?.[0] ?? gap?.[0] ?? gapXCenter, [offset, gap, gapXCenter]);
        const offsetTop = useMemo(() => offset?.[1] ?? gap?.[1] ?? gapYCenter, [offset, gap, gapYCenter]);

        /**
         * @description 计算水印元素的定位样式
         * @returns 水印元素的 CSS 属性对象
         */
        const getMarkStyle = useCallback((): React.CSSProperties => {
            const markStyle: React.CSSProperties = {
                zIndex,
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                backgroundRepeat: 'repeat',
            };

            let positionLeft = offsetLeft - gapXCenter;
            let positionTop = offsetTop - gapYCenter;
            if (positionLeft > 0) {
                markStyle.left = `${positionLeft}px`;
                markStyle.width = `calc(100% - ${positionLeft}px)`;
                positionLeft = 0;
            }
            if (positionTop > 0) {
                markStyle.top = `${positionTop}px`;
                markStyle.height = `calc(100% - ${positionTop}px)`;
                positionTop = 0;
            }
            markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

            return markStyle;
        }, [zIndex, offsetLeft, offsetTop, gapXCenter, gapYCenter]);

        const containerRef = useRef<HTMLDivElement | null>(null);
        const watermarkRef = useRef<HTMLDivElement | null>(null);
        const [stopObservation, setStopObservation] = useState(false);

        /**
         * @description 销毁水印 DOM 元素
         */
        const destroyWatermark = useCallback(() => {
            if (watermarkRef.current) {
                watermarkRef.current.remove();
                watermarkRef.current = undefined;
            }
        }, []);

        /**
         * @description 将水印 base64 图片追加到容器中
         * @param base64Url - Canvas 导出的 base64 数据 URL
         * @param markWidth - 水印图案的宽度
         */
        const appendWatermark = useCallback(
            (base64Url: string, markWidth: number) => {
                if (containerRef.current && watermarkRef.current) {
                    setStopObservation(true);
                    watermarkRef.current.setAttribute(
                        'style',
                        getStyleStr({
                            ...getMarkStyle(),
                            backgroundImage: `url('${base64Url}')`,
                            backgroundSize: `${Math.floor(markWidth)}px`,
                        }),
                    );
                    containerRef.current.appendChild(watermarkRef.current);
                    setTimeout(() => {
                        setStopObservation(false);
                    });
                }
            },
            [getMarkStyle, setStopObservation],
        );

        /**
         * @description 渲染水印到 Canvas 并插入 DOM
         */
        const renderWatermark = useCallback(() => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                if (!watermarkRef.current) {
                    watermarkRef.current = document.createElement('div');
                }

                const ratio = getPixelRatio();
                const [markWidth, markHeight, space] = getMarkSize(
                    {
                        image,
                        content: content,
                        width,
                        height,
                        rotate,
                        font: fontConfig,
                    },
                    ctx,
                );

                /**
                 * @description 在 Canvas 上绘制水印内容并追加到 DOM
                 * @param drawContent - 要绘制的内容（文本或图片元素），如果为 undefined 则使用 props.content
                 */
                const drawCanvas = (drawContent?: NonNullable<WatermarkProps['content']> | HTMLImageElement) => {
                    const currentContent = drawContent ?? content;
                    const [textClips, clipWidth] = getClips(currentContent || '', rotate, ratio, markWidth, markHeight, fontConfig, gapX, gapY, space);

                    appendWatermark(textClips, clipWidth);
                };

                if (image) {
                    const img = new Image();
                    img.onload = () => {
                        drawCanvas(img);
                    };
                    img.onerror = () => {
                        drawCanvas(content);
                    };
                    img.crossOrigin = 'anonymous';
                    img.referrerPolicy = 'no-referrer';
                    img.src = image;
                } else {
                    drawCanvas(content);
                }
            }
        }, [image, content, width, height, rotate, fontConfig, gapX, gapY, appendWatermark]);

        /**
         * @description 组件挂载时渲染水印，卸载时销毁水印
         */
        useEffect(() => {
            renderWatermark();

            return () => {
                destroyWatermark();
            };
        }, []); // eslint-disable-line react-hooks/exhaustive-deps

        /**
         * @description 当 props 变化时重新渲染水印
         */
        useEffect(() => {
            renderWatermark();
        }, [props]);

        /**
         * @description 使用 MutationObserver 监听 DOM 变化，防止水印被篡改
         */
        useEffect(() => {
            const container = containerRef.current;
            if (!container) {
                return;
            }

            const observer = new MutationObserver((mutations: MutationRecord[]) => {
                if (stopObservation) {
                    return;
                }
                mutations.forEach(mutation => {
                    if (reRendering(mutation, watermarkRef.current)) {
                        destroyWatermark();
                        renderWatermark();
                    }
                });
            });

            observer.observe(container, {
                attributes: true,
                subtree: true,
                childList: true,
            });

            return () => {
                observer.disconnect();
            };
        }, [stopObservation, destroyWatermark, renderWatermark]);

        const containerStyle: React.CSSProperties = useMemo(
            () => ({
                position: 'relative',
                ...style,
            }),
            [style],
        );

        return (
            <div
                ref={node => {
                    containerRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }
                }}
                className={className}
                style={containerStyle}
            >
                {children}
            </div>
        );
    }),
);

Watermark.displayName = 'ElWatermark';

export default Watermark;
