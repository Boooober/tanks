import { ObjectBaseDTO } from '../../../../../common/objects/dto/object.base.dto.class';

export class BaseObject extends ObjectBaseDTO {
    public defence: number;
    public objectId: string;
    public obsolete?: boolean;

    updateCenter(): void {
        this.centerX = this.x + this.getWidth() / 2;
        this.centerY = this.y + this.getHeight() / 2;
    }

    remove(): void {
        this.obsolete = true;
    }

    hit(power: number): void {
        const defence = this.getDefence();
        const powerCoefficient = defence === 0 ? 1 : 1 / (0.5 * defence);

        this.health -= power * powerCoefficient;
    }

    exists(): boolean {
        return !this.obsolete;
    }

    isCollidedWith(object): boolean {
        return this.x < object.x + object.getWidth() &&
            this.x + this.getWidth() > object.x &&
            this.y < object.y + object.getHeight() &&
            this.getHeight() + this.y > object.y;
    }

    generateRandomPosition(): void {
        this.x = Math.floor(Math.random() * 1000);
        this.y = Math.floor(Math.random() * 700);
        this.deg = Math.floor(Math.random() * 360);
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getHealth(): number {
        return this.health;
    }

    getMaxHealth(): number {
        return this.maxHealth;
    }

    getDefence(): number {
        return this.defence;
    }
}
