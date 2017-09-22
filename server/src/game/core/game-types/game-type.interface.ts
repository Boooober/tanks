export interface IGameType {
    start(strategyConfig: Object): void;
    terminate(): void;
}
