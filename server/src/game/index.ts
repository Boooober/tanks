import loader from '../core/di/loader';

import {
    LogService
} from './modules';

import { GameLoopService } from './core/loop/game-loop.service';
import { DeathSalvationMode } from './modes';
import {
    DeathmatchService, DeathmatchStatisticsService, DeathmatchStrategy, RoundsService,
    RoundsStatisticsService, RoundsStrategy
} from './game-types';
import { UnitModifyService } from './core/player/unit/unit-modify.service';
import { UnitControlService } from './core/player/unit/unit-control.service';
import { GameObjectsCalculationsService } from './core/player/calculation/game-objects-calculations.service';
import { GameObjectsService } from './core/player/game-objects.service';
import { PlayerService } from './core/player/player/players.service';
import { setupCore } from '../core';

setupCore(); // TODO FIX IT ASAP!!!

loader.addProviders([
    PlayerService,
    GameLoopService,
    GameObjectsService,
    GameObjectsCalculationsService,
    UnitControlService,
    UnitModifyService,
    RoundsService,
    RoundsStrategy,
    RoundsStatisticsService,
    DeathmatchService,
    DeathmatchStrategy,
    DeathmatchStatisticsService,
    DeathSalvationMode,

    LogService
]);

import { GameRunService } from './game-run';
import { GameConfigService } from './game-config';

export default loader.resolve([
    GameRunService,
    GameConfigService
]).get(GameRunService);
