export class BaseModel {

    private data: object = {};

    get(): object {
        return this.data;
    }

    update(updates: any): object {
        return { ...this.data, ...updates };
    }

    clear(): void {
        this.data = {};
    }
}
