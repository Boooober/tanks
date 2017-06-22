import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerUnitModel } from '../../models/player-unit.model';
import { UserConnectionService } from '../../connection/user-connection.service';

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

    constructor(private PlayerUnitModel: PlayerUnitModel,
                private UserConnectionService: UserConnectionService) {
    }

    ngOnInit(): void {
        this.unitScale = 1;
        this.unitSubscription$ = this.UserConnectionService
            .pollFilteredStream(
                'unitUpdates',
                UNIT_POLLING_INTERVAL,
                () => this.UserConnectionService.sendMessage('unitUpdates')
            )
            .subscribe(unit => {
                this.PlayerUnitModel.update(unit);
                this.unitScale = this.PlayerUnitModel.getScale();
            });
    }

    ngOnDestroy(): void {
        this.unitSubscription$.unsubscribe();
    }

    getUsername(): string {
        return this.PlayerUnitModel.getUsername();
    }

    getUnitInfo(): Array<{ name: string, value: string | number }> {
        return [
            { name: 'Speed', value: this.PlayerUnitModel.getSpeed() },
            { name: 'Health', value: `${this.PlayerUnitModel.getHealth()} / ${this.PlayerUnitModel.getMaxHealth()}` },
            { name: 'Damage', value: `${this.PlayerUnitModel.getDamage()} points per sec` },
            { name: 'Attack speed', value: `${this.PlayerUnitModel.getAttackSpeed()} hits per sec` },
            { name: 'Rotate speed', value: this.PlayerUnitModel.getRotateSpeed() },
            { name: 'Scale', value: `${this.PlayerUnitModel.getScale()}` },
            { name: 'Dimensions', value: `${this.PlayerUnitModel.getDimensions()[0]}x${this.PlayerUnitModel.getDimensions()[1]}` }
        ];
    }

    onScaleChange(scale): void {
        this.UserConnectionService.sendMessage('unitUpdates', { scale });
    }

    resetScale(): void {
        this.onScaleChange(1);
    }
}
