export const loggerMiddleware = () => (next: any) => (action: any) => {
    // eslint-disable-next-line no-console
    console.log(action);

    next(action);
};
