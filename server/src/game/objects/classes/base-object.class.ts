export class BaseObject {
    public x: number;
    public y: number;
    public deg: number;
    public type: string;
    public width: number;
    public height: number;
    public health: number;
    public maxHealth: number;
    public remove?: boolean;
    public centerX: number;
    public centerY: number;
    public objectId: string;
    public color: { r: number, g: number, b: number };

    updateCenter(): void {
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
    }

    isCollidedWith(object): boolean {
        return this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.height + this.y > object.y;
    }
}
