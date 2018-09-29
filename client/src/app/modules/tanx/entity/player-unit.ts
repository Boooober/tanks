import { PlayerUnitObjectBaseDTO } from '../../../../../../common/objects/dto/player-unit-object.base.dto.class';

export class PlayerUnit extends PlayerUnitObjectBaseDTO {
    static TYPE: string = 'player';

    public fireImage: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}
