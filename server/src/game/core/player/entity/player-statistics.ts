export class PlayerStatistics {

    constructor(
        public username?: string,
        public score: number = 0,
        public totalShoots: number = 0,
        public successShoots: number = 0,
        public totalDamage: number = 0,
        public receivedDamage: number = 0
    ) {}
}
