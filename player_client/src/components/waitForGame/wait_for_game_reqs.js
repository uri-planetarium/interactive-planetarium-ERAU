/**
 * @description Attempt to retrieve a player from the API using a player_id and game_code
 * @param {string} player_id
 * @param {integer} game_code
 * @returns Either a player or an error JSON object
 */
 const getPlayer = async (player_id, game_code) => {
    try {
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

export { getPlayer };