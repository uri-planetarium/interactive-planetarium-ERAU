import { getPlayerCache, setPlayerCache } from "../../Cache/player_cache"; 

// Given the player_id and game_code, check if the player exists within the cached game
const getPlayer = async (player_id, game_code) => {
    try {
        const response = await fetch(`/api/lobbys/${game_code}/${player_id}`)
        .then(response => response.json());

        if (!response.error) {
            return response;
        } else {
            throw new Error(response.error.code);
        }
    } catch (error) {
        throw new Error(error.message);
    }  
};

// Given the game_code, check if that game is active 
const checkGame = async (game_code) => {
    try {
        const response = await fetch(`/api/games/${game_code}`)
        .then(response => response.json());

        if (!response.error) {
            if (response.is_active) {
                return response;
            } else {
                throw new Error(`game ${game_code} is not active`);
            }
        } else {
            throw new Error(response.error.code);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Attempt a login using api requests for the lobbys and games tables
const attemptLogin = () => {
    const { player_id, game_code } = getPlayerCache().data;

    console.debug(`Retrieved player ${player_id} from local storage`);

    getPlayer(player_id, game_code)
    .then(player => {
        console.debug(response);

        checkGame(game_code)
        .then(
            //TODO - Navigate to the waiting screen
        )
        .catch(error);
    })
    .catch(error);
}