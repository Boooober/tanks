export class BaseModel {
    private data: Object = {};

    get(): Object {
        return this.data;
    }

    update(updates): Object {
        return Object.assign(this.data, updates);
    }

    clear(): void {
        this.data = {};
    }
}
