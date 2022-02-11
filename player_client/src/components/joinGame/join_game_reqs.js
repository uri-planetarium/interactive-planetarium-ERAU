/**
 * @description Attempt to create a player using a player_name and game_id
 * @param {string} player_name  
 * @param {integer} game_code
 * @returns Either a player or an error JSON object
 */
 const createPlayer = async (player_name, game_code) => {
    try {
        const body = { player_name };

        /* Make POST request for player */
        const response = await fetch(`/api/lobbys/${game_code}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(response => response.json());

        /* If there was an error with the query, return it */
        if (!response.error) {
            return response;
        } else {
            throw new Error(response.error.code);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @description Attempt to retrieve a player from the API using a player_id and game_code
 * @param {string} player_id
 * @param {integer} game_code
 * @returns Either a player or an error JSON object
 */
const getPlayer = async (player_id, game_code) => {
    try {
        console.log(player_id +  " and " + game_code);
        /* Make GET request for player */
        const response = await fetch(`/api/lobbys/${game_code}/${player_id}`)
        .then(response => response.json());

        /* If there was an error with the query, return it */
        if (!response.error) {
            return response;
        } else {
            throw new Error(response.error.code);
        }
    } catch (error) {
        throw new Error(error.message);
    }  
};

/**
 * @description Attempt to retrieve a game from the API using a game_code
 * @param {integer} game_code
 * @returns Either a game or an error JSON object
 */
 const getGame = async (game_code) => {
    try {
        console.log(game_code);
        /* Make GET request for game */
        const response = await fetch(`/api/games/${game_code}`)
        .then(response => response.json());

        /* If there was an error with the query, return it */
        if (!response.error) {
            /* If game is currently active, create the player */
            if (response.is_active) {
                return response;
            } else {
                throw new Error("Game " + game_code + " is not active");
            }
        } else {
            throw new Error(response.error.code);
        }
    } catch (error) {
        throw new Error(error.message + "This is the problem");
    }
};

export { createPlayer, getPlayer, getGame };