export class GameActionsService {
    private actions: { [name: string]: (sessionId?: string, data?: any) => void } = {};

    registerAction(name, callback: (sessionId?: string, data?: any) => void): void {
        this.actions[name] = callback;
    }

    executeAction(name: string, sessionId?: string, data?: any): void {
        if (this.actions[name]) {
            this.actions[name](sessionId, data);
        }
    }
}

export default new GameActionsService();
