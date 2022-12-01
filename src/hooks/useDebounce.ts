type CallbackType = (...args: any) => void;

export const useDebounce = (callback: CallbackType, time: number) => {
    let tid: null | ReturnType<typeof setTimeout> = null;

    return (...args: any) => {
        if (tid) {
            clearTimeout(tid);
        }

        tid = setTimeout(() => callback(...args), time);
    };
};
