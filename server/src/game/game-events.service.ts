class GameEvents {
    private events: { [action: string]: Array<Function> } = {};

    on(type: string, callback: Function): void {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }

    exec(type: string, ...args): void {
        (this.events[type] || []).forEach(callback => callback(...args));
    }
}

export default new GameEvents;
