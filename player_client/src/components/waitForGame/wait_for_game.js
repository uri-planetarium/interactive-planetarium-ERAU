import React, { Fragment, useState, useEffect } from "react";
import { getPlayerCache, setPlayerCache } from "../../Cache/player_cache";
import { getPlayer } from "./wait_for_game_reqs";
import "./wait_for_game_style.css";

/**
 * @description the WaitForGame component for the player_client
 * @returns Fragment
 */
const WaitForGame = () => { 

    //TODO - Come up with better default values
    const [ player, setPlayer ] = useState({
        player_id: 'null', 
        game_code: 'null',
        player_name: 'null',
        player_score: 'null'
    });
    
    useEffect(() => {
        getPlayerInfo();
    }, []);
    
    /**
     * @description Retrieve player info from the cache
     */
    const getPlayerInfo = () => {
        const { cached_player_id, cached_game_code } = getPlayerCache().data;

        getPlayer(cached_player_id, cached_game_code)
        .then(player => setPlayer(player))
        .catch(error => handleError(`Player Retrieval Failure - ${error}`));
    };

    /**
     * @description Handle errors from the API connections
     * @param {String} error 
     */
    const handleError = (error) => {
        //TODO - Handle 
        console.error(error);
    }

    return (
        <Fragment>
            <h1>Yo yo {player.player_name}, wait for the game to start yo!</h1>
        </Fragment>
    );
};

export default WaitForGame;