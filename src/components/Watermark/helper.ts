import type { CSSProperties } from 'react';
import type { WatermarkFontType, WatermarkProps } from './typings';

/** 用于判断值是否为 undefined 的辅助函数 */
function isUndefined(val: unknown): val is undefined {
    return val === undefined;
}

/** 用于判断值是否为数组的辅助函数 */
function isArray(val: unknown): val is unknown[] {
    return Array.isArray(val);
}

/**
 * @description 将驼峰命名的字符串转换为小写并用指定分隔符连接
 * @param key - 驼峰命名的键名
 * @returns 转换后的小写分隔字符串
 */
function toLowercaseSeparator(key: string): string {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * @description 将 CSSProperties 对象转换为内联样式字符串
 * @param style - CSS 属性对象
 * @returns 内联样式字符串
 */
export function getStyleStr(style: CSSProperties): string {
    return Object.keys(style)
        .map(key => `${toLowercaseSeparator(key)}: ${(style as Record<string, unknown>)[key]};`)
        .join(' ');
}

/**
 * @description 返回设备物理像素分辨率与 CSS 像素分辨率的比率
 * @returns 设备像素比
 */
export function getPixelRatio(): number {
    return window.devicePixelRatio || 1;
}

/**
 * @description 判断是否需要重新渲染水印
 * @param mutation - MutationRecord 对象
 * @param watermarkElement - 水印 DOM 元素（可选）
 * @returns 是否需要重新渲染
 */
export const reRendering = (mutation: MutationRecord, watermarkElement?: HTMLElement): boolean => {
    let flag = false;
    if (mutation.removedNodes.length && watermarkElement) {
        flag = Array.from(mutation.removedNodes).includes(watermarkElement);
    }
    if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
        flag = true;
    }
    return flag;
};

/** 文本对齐比例映射：[对齐比例, 间距比例] */
const TEXT_ALIGN_RATIO_MAP: Record<string, [number, number]> = {
    left: [0, 0.5],
    start: [0, 0.5],
    center: [0.5, 0],
    right: [1, -0.5],
    end: [1, -0.5],
};

/**
 * @description 准备 Canvas 并返回其上下文和相关尺寸
 * @param width - 画布逻辑宽度
 * @param height - 画布逻辑高度
 * @param ratio - 像素比率
 * @returns [画布上下文, 画布元素, 实际宽度, 实际高度]
 */
function prepareCanvas(width: number, height: number, ratio = 1): [ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, realWidth: number, realHeight: number] {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const realWidth = width * ratio;
    const realHeight = height * ratio;
    canvas.setAttribute('width', `${realWidth}px`);
    canvas.setAttribute('height', `${realHeight}px`);
    ctx.save();

    return [ctx, canvas, realWidth, realHeight];
}

/**
 * @description 获取水印内容的 Canvas 剪辑（clips）
 *  生成包含旋转和填充的水印图案 data URL
 * @param content - 水印内容（文本或图片元素）
 * @param rotate - 旋转角度
 * @param ratio - 像素比率
 * @param width - 内容宽度
 * @param height - 内容高度
 * @param font - 字体样式配置（必填）
 * @param gapX - 水平间距
 * @param gapY - 垂直间距
 * @param space - 旋转后的额外空间
 * @returns [dataURL, 最终宽度, 最终高度]
 */
export function getClips(
    content: NonNullable<WatermarkProps['content']> | HTMLImageElement,
    rotate: number,
    ratio: number,
    width: number,
    height: number,
    font: Required<NonNullable<WatermarkFontType>>,
    gapX: number,
    gapY: number,
    space: number,
): [dataURL: string, finalWidth: number, finalHeight: number] {
    const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(width, height, ratio);
    let baselineOffset = 0;

    if (content instanceof HTMLImageElement) {
        ctx.drawImage(content, 0, 0, contentWidth, contentHeight);
    } else {
        const { color, fontSize, fontStyle, fontWeight, fontFamily, textAlign, textBaseline } = font;
        const mergedFontSize = Number(fontSize) * ratio;

        ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        const contents = isArray(content) ? content : [content];

        if (textBaseline !== 'top' && contents[0]) {
            const argumentMetrics = ctx.measureText(contents[0] as string);
            ctx.textBaseline = 'top';
            const topMetrics = ctx.measureText(contents[0] as string);
            baselineOffset = argumentMetrics.actualBoundingBoxAscent - topMetrics.actualBoundingBoxAscent;
        }

        contents?.forEach((item, index) => {
            const [alignRatio, spaceRatio] = TEXT_ALIGN_RATIO_MAP[textAlign];
            ctx.fillText(item ?? '', contentWidth * alignRatio + space * spaceRatio, index * (mergedFontSize + font.fontGap * ratio));
        });
    }

    const angle = (Math.PI / 180) * Number(rotate);
    const maxSize = Math.max(width, height);
    const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);

    rCtx.translate(realMaxSize / 2, realMaxSize / 2);
    rCtx.rotate(angle);
    if (contentWidth > 0 && contentHeight > 0) {
        rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
    }

    /** 获取旋转后的坐标 */
    function getRotatePos(x: number, y: number): [number, number] {
        const targetX = x * Math.cos(angle) - y * Math.sin(angle);
        const targetY = x * Math.sin(angle) + y * Math.cos(angle);
        return [targetX, targetY];
    }

    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;

    const halfWidth = contentWidth / 2;
    const halfHeight = contentHeight / 2;
    const points = [
        [0 - halfWidth, 0 - halfHeight],
        [0 + halfWidth, 0 - halfHeight],
        [0 + halfWidth, 0 + halfHeight],
        [0 - halfWidth, 0 + halfHeight],
    ];

    points.forEach(([x, y]) => {
        const [targetX, targetY] = getRotatePos(x, y);
        left = Math.min(left, targetX);
        right = Math.max(right, targetX);
        top = Math.min(top, targetY);
        bottom = Math.max(bottom, targetY);
    });

    const cutLeft = left + realMaxSize / 2;
    const cutTop = top + realMaxSize / 2;
    const cutWidth = right - left;
    const cutHeight = bottom - top;

    const realGapX = gapX * ratio;
    const realGapY = gapY * ratio;
    const filledWidth = (cutWidth + realGapX) * 2;
    const filledHeight = cutHeight + realGapY;

    const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);

    /** 在填充画布上绘制旋转后的图像 */
    function drawImg(targetX = 0, targetY = 0) {
        fCtx.drawImage(rCanvas, cutLeft, cutTop, cutWidth, cutHeight, targetX, targetY + baselineOffset, cutWidth, cutHeight);
    }
    drawImg();
    drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
    drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);

    return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio];
}

/**
 * @description 获取水印的宽度和高度
 *  默认值：图片 [120, 64]；文本内容：根据内容计算
 * @param props - 水印组件属性
 * @param ctx - Canvas 2D 渲染上下文
 * @returns [宽度, 高度, 额外空间]
 */
export function getMarkSize(
    props: {
        image?: string;
        content?: string | string[];
        width?: number;
        height?: number;
        rotate?: number;
        font?: WatermarkFontType;
    },
    ctx: CanvasRenderingContext2D,
): readonly [number, number, number] {
    let defaultWidth = 120;
    let defaultHeight = 64;
    let space = 0;

    const { image, content, width, height, rotate, font } = props;

    const finalFontSize = font?.fontSize ?? 16;
    const finalFontFamily = font?.fontFamily ?? 'sans-serif';
    const finalFontGap = font?.fontGap ?? 3;

    if (!image && ctx.measureText) {
        ctx.font = `${Number(finalFontSize)}px ${finalFontFamily}`;

        const contents = isArray(content) ? content : [content];
        let maxWidth = 0;
        let maxHeight = 0;

        contents.forEach(item => {
            const { width: textWidth, fontBoundingBoxAscent, fontBoundingBoxDescent, actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText(item as string);
            const textHeight = isUndefined(fontBoundingBoxAscent) ? actualBoundingBoxAscent + actualBoundingBoxDescent : fontBoundingBoxAscent + fontBoundingBoxDescent;

            if (textWidth > maxWidth) {
                maxWidth = Math.ceil(textWidth);
            }
            if (textHeight > maxHeight) {
                maxHeight = Math.ceil(textHeight);
            }
        });

        defaultWidth = maxWidth;
        defaultHeight = maxHeight * contents.length + (contents.length - 1) * finalFontGap;

        const angle = (Math.PI / 180) * Number(rotate);
        space = Math.ceil(Math.abs(Math.sin(angle) * defaultHeight) / 2);

        defaultWidth += space;
    }

    return [width ?? defaultWidth, height ?? defaultHeight, space] as const;
}
