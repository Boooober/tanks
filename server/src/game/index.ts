import Loader from 'Loader';

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
} from 'Core';

import {
    LogService,
    GameStatisticsService
} from 'Modules';

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
