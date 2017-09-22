export enum MODES {
    DEATH_SALVATION
}

export enum TYPES {
    ROUNDS,
    DEATHMATCH
}

export const TYPES_CONFIG = {
    [TYPES.ROUNDS]: {
        roundDuration: 2 * 60 * 1000,
        breakDuration: 0.5 * 60 * 1000
    },
    [TYPES.DEATHMATCH]: {}
};

export const CONFIG = {
    modes: [
        MODES.DEATH_SALVATION
    ],
    gameType: {
        strategy: TYPES.DEATHMATCH,
        config: TYPES_CONFIG[TYPES.DEATHMATCH]
    }
};
