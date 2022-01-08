import React, { Fragment, useState, useEffect } from "react";
import { getPlayerCache, setPlayerCache } from "../../Cache/player_cache";

/**
 * @description the WaitForGame component for the player_client
 * @returns Fragment
 */
const WaitForGame = () => { 
    const [ player, setPlayer ] = useState({player_name: ''});
    
    useEffect(() => {
        getPlayerInfo();
    }, []);
    
    /**
     * @description Retrieve player info from the cache
     */
    const getPlayerInfo = () => {
        try {
            setPlayer(getPlayerCache().data);
            console.log("Retrieving Player Data: " +JSON.stringify(player.player_name));
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h1>Hello {player.player_name}, wait for the game to start dummy</h1>
        </Fragment>
    );
};

export default WaitForGame;