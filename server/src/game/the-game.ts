import { MODS } from './mods.constant';

import setupGameLoop from './modules/setup-game-loop';
import setupGameSocket from './modules/setup-game-socket';

import StatisticsService from './statistics/game-statistics-calculation.service';

import DeathSalvation from './features/death-salvation-mode';

export default function theGame(app) {
    setupGameLoop();
    setupGameSocket(app);
    StatisticsService.init();

    if (MODS.DEATH_SALVATION) {
        DeathSalvation.init();
    }
}
