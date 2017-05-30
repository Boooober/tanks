import { MODS } from './mods.constant';

import setupGameLoop from './modules/setup-game-loop';
import setupGameSocket from './modules/setup-game-socket';
import setupGameEndpoints from './endpoints/setup-game-endpoints';

import StatisticsService from './statistics/game-statistics-calculation.service';

import DeathSalvation from './features/death-salvation-mode';

export default function theGame(app) {
    setupGameLoop();
    setupGameSocket(app);
    setupGameEndpoints(app);
    StatisticsService.init();

    if (MODS.DEATH_SALVATION) {
        DeathSalvation.init();
    }
}
