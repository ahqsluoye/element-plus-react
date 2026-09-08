/**
 * 单元测试环境补充：jsdom 缺少的浏览器 API 兜底实现。
 * 仅在宿主环境未提供时生效，不影响真实浏览器行为。
 */

// jsdom 未实现 ResizeObserver（Table 内的 Scrollbar 会用到）
if (typeof globalThis.ResizeObserver === 'undefined') {
    class ResizeObserverPolyfill {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    globalThis.ResizeObserver = ResizeObserverPolyfill as unknown as typeof ResizeObserver;
}

// 兜底 requestAnimationFrame（vitest jsdom 默认开启 pretendToBeVisual，通常已存在）
if (typeof globalThis.requestAnimationFrame === 'undefined') {
    globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number => setTimeout(() => callback(Date.now()), 16) as unknown as number;
    globalThis.cancelAnimationFrame = (handle: number): void => clearTimeout(handle);
}

// jsdom 不执行布局，clientWidth 恒为 0；而 Table 的列注册流程被 clientWidth === 0 守卫拦截，
// 这里统一 mock 一个非零宽度，保证列初始化在测试环境中正常执行
Object.defineProperty(window.HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
        return 1000;
    },
});
