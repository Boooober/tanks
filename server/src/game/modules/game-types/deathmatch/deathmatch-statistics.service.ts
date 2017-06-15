import GameEvents from '../../../game-events.service';
import { StatisticsAbstract } from '../statistics.abstract';

export class DeathmatchStatisticsService extends StatisticsAbstract {}

export default new DeathmatchStatisticsService(GameEvents);
