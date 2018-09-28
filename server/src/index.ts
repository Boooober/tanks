import server from './server';

process.on('uncaughtException', (error: Error): void => {
    console.error(`uncaughtException ${error.message}`);
});

process.on('unhandledRejection', (reason: any): void => {
    console.error(`unhandledRejection ${reason}`);
});

(async (): Promise<void> => {
    await server();
})();
