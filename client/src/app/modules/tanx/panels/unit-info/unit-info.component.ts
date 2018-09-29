import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { PlayerUnitInfoModel } from '../../entity/player-unit-info.model';

export const UNIT_POLLING_INTERVAL = 1000;

@Component({
    selector: 'app-unit-info',
    templateUrl: './unit-info.component.html',
    styleUrls: ['./unit-info.component.scss']
})
export class UnitInfoComponent implements OnInit, OnDestroy {

    public minScale: number = 0.25;
    public maxScale: number = 5;
    public scaleStep: number = 0.05;
    public unitScale: number;

    private unitSubscription$: Subscription = new Subscription();

    constructor(
        private playerUnitInfoModel: PlayerUnitInfoModel
        // private userConnectionService: UserConnectionService
    ) {}

    ngOnInit(): void {
        // TODO move this to backend (do not use polling)
        // this.unitScale = this.playerUnitInfoModel.getScale();
        // this.unitSubscription$ = this.userConnectionService
        //     .pollFilteredStream(
        //         'unitUpdates',
        //         UNIT_POLLING_INTERVAL,
        //         () => this.userConnectionService.sendMessage('unitUpdates')
        //     )
        //     .subscribe(unit => {
        //         this.playerUnitInfoModel.update(unit);
        //         this.unitScale = this.playerUnitInfoModel.getScale();
        //     });
    }

    ngOnDestroy(): void {
        this.unitSubscription$.unsubscribe();
    }

    getUsername(): string {
        return this.playerUnitInfoModel.getUsername();
    }

    getUnitInfo(): Array<{ name: string, value: string | number }> {
        return [
            { name: 'Speed', value: this.playerUnitInfoModel.getSpeed() },
            { name: 'Health', value: `${this.playerUnitInfoModel.getHealth()} / ${this.playerUnitInfoModel.getMaxHealth()}` },
            { name: 'Damage', value: `${this.playerUnitInfoModel.getDamage()} points per sec` },
            { name: 'Defence', value: this.playerUnitInfoModel.getDefence() },
            { name: 'Attack speed', value: `${this.playerUnitInfoModel.getAttackSpeed()} hits per sec` },
            { name: 'Rotate speed', value: this.playerUnitInfoModel.getRotateSpeed() },
            { name: 'Scale', value: `${this.playerUnitInfoModel.getScale()}` },
            { name: 'Dimensions', value: `${this.playerUnitInfoModel.getDimensions()[0]}x${this.playerUnitInfoModel.getDimensions()[1]}` }
        ];
    }

    // onScaleChange(scale: number): void {
    //     this.userConnectionService.sendMessage('unitUpdates', { scale });
    // }

    // resetScale(): void {
    //     this.onScaleChange(1);
    // }
}
