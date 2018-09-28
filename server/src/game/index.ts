import Loader from '../loader';

import {
    GameLoopService,
    GameEventsService,
    GameActionsService,
    GameSessionsService,
    GameObjectsService,
    GameObjectsCalculationsService,
    PlayersService,
    UnitControlService,
    UnitModifyService,
    RoundsService,
    RoundsStrategy,
    RoundsStatisticsService,
    DeathmatchService,
    DeathmatchStrategy,
    DeathmatchStatisticsService,
    DeathSalvationMode
} from './core';

import {
    LogService,
    GameStatisticsService
} from './modules';

Loader.addProviders([
    GameLoopService,
    GameEventsService,
    GameActionsService,
    GameSessionsService,
    GameObjectsService,
    GameObjectsCalculationsService,
    PlayersService,
    UnitControlService,
    UnitModifyService,
    RoundsService,
    RoundsStrategy,
    RoundsStatisticsService,
    DeathmatchService,
    DeathmatchStrategy,
    DeathmatchStatisticsService,
    DeathSalvationMode,

    LogService,
    GameStatisticsService
]);

import { GameRunService } from './game-run';
import { GameConfigService } from './game-config';

export default Loader.resolve([
    GameRunService,
    GameConfigService
]).get(GameRunService);
