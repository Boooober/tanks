import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerUnitInfoModel } from '../../../../models/player-unit-info.model';
import { UserConnectionService } from '../../../../core/connection/user-connection.service';

export const UNIT_POLLING_INTERVAL = 1000;

@Component({
    selector: 'app-unit-info',
    templateUrl: './unit-info.component.html',
    styleUrls: ['./unit-info.component.scss']
})
export class UnitInfoComponent implements OnInit, OnDestroy {
    public minScale = 0.25;
    public maxScale = 5;
    public scaleStep = 0.05;
    public unitScale: number;

    private unitSubscription$: Subscription;

    constructor(private PlayerUnitInfoModel: PlayerUnitInfoModel,
                private UserConnectionService: UserConnectionService) {
    }

    ngOnInit(): void {
        // TODO move this to backend (do not use polling)
        this.unitScale = this.PlayerUnitInfoModel.getScale();
        this.unitSubscription$ = this.UserConnectionService
            .pollFilteredStream(
                'unitUpdates',
                UNIT_POLLING_INTERVAL,
                () => this.UserConnectionService.sendMessage('unitUpdates')
            )
            .subscribe(unit => {
                this.PlayerUnitInfoModel.update(unit);
                this.unitScale = this.PlayerUnitInfoModel.getScale();
            });
    }

    ngOnDestroy(): void {
        this.unitSubscription$.unsubscribe();
    }

    getUsername(): string {
        return this.PlayerUnitInfoModel.getUsername();
    }

    getUnitInfo(): Array<{ name: string, value: string | number }> {
        return [
            { name: 'Speed', value: this.PlayerUnitInfoModel.getSpeed() },
            { name: 'Health', value: `${this.PlayerUnitInfoModel.getHealth()} / ${this.PlayerUnitInfoModel.getMaxHealth()}` },
            { name: 'Damage', value: `${this.PlayerUnitInfoModel.getDamage()} points per sec` },
            { name: 'Defence', value: this.PlayerUnitInfoModel.getDefence() },
            { name: 'Attack speed', value: `${this.PlayerUnitInfoModel.getAttackSpeed()} hits per sec` },
            { name: 'Rotate speed', value: this.PlayerUnitInfoModel.getRotateSpeed() },
            { name: 'Scale', value: `${this.PlayerUnitInfoModel.getScale()}` },
            { name: 'Dimensions', value: `${this.PlayerUnitInfoModel.getDimensions()[0]}x${this.PlayerUnitInfoModel.getDimensions()[1]}` }
        ];
    }

    onScaleChange(scale): void {
        this.UserConnectionService.sendMessage('unitUpdates', { scale });
    }

    resetScale(): void {
        this.onScaleChange(1);
    }
}
