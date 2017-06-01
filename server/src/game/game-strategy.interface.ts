export interface IGameStrategy {
    start(strategyConfig: Object): void;
    terminate(): void;
}
