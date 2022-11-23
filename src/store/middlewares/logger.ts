export const loggerMiddleware =
    (store: any) => (next: any) => (action: any) => {
        // eslint-disable-next-line no-console
        console.log(action);

        next(action);
    };
