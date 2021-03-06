declare var require;

export const getWebsocket = (): string => {
    return hasCustomConfig()
        ? require('./config').WEBSOCKET_ADDRESS
        : require('./config.example').WEBSOCKET_ADDRESS;
};

export const getMongo = (): string => {
    return hasCustomConfig()
        ? require('./config').MONGO_DATABASE
        : require('./config.example').MONGO_DATABASE;
};

const context = require.context('./', false, /^config/);
const hasCustomConfig = (): boolean => {
    return context.keys().includes('./config.ts')
};
