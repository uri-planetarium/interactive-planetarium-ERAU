const PLAYER_CACHE = "PLAYER_CACHE";

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

const setPlayerCache = (playerData) => {
    const playerCache = getPlayerCache();

    const info = {
        player_id: playerData.player_id,
        game_id: playerData.game_id,
        player_name: playerData.player_name,
        player_score: playerData.player_score
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