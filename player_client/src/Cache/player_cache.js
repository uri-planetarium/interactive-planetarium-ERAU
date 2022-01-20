const PLAYER_CACHE = "PLAYER_CACHE";

/**
 * @description If player data is stored in cache, retrieve it.
 * @returns playerCache JSON object
 */
const getPlayerCache = () => {
    let playerCache = {
        data: {}
    }
    
    try {
        const data = localStorage.getItem(PLAYER_CACHE);

        if (data) {
            playerCache = JSON.parse(data);
        }
    } catch (error) {
        console.error(error.message);
    }

    return playerCache;
};

/**
 * @description Store given player data in cache
 * @param {object} playerData 
 */
const setPlayerCache = (playerID, gameCode) => {
    const playerCache = getPlayerCache();

    const info = {
        player_id: playerID,
        game_code: gameCode
    }

    playerCache.data = info;

    try {
        localStorage.setItem(PLAYER_CACHE, JSON.stringify(playerCache));
    } catch (error) {
        console.error(error.message);
    }
};

// const deletePlayerCache = (data) => {
//     if (data) {
//         delete data;
//     }
// };

export { setPlayerCache, getPlayerCache };