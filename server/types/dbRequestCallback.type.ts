export type RequestCallbackAll<T> = (err: Error | null, rows: Array<T>) => void;
export type RequestCallbackRun = (err: Error | null) => void;
