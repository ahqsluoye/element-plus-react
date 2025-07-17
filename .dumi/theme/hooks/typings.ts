export interface Position {
    x: number;
    y: number;
}
export interface ConfigurableWindow {
    window?: Window;
}

export type Promisify<T> = Promise<Awaited<T>>;

export type AnyFn = (...args: any[]) => any;

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
    fn: FunctionArgs<Args, This>;
    args: Args;
    thisArg: This;
}

export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
    invoke: Invoke,
    options: FunctionWrapperOptions<Args, This>,
) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>;

export interface ConfigurableEventFilter {
    /**
     * Filter for if events should to be received.
     *
     */
    eventFilter?: EventFilter;
}
