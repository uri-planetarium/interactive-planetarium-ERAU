import React, { Fragment, useState, useEffect } from "react";
import { getPlayerCache, setPlayerCache } from "../../Cache/player_cache";

/**
 * @description the WaitForGame component for the player_client
 * @returns Fragment
 */
const WaitForGame = () => { 
    const { player_id, game_id } = getPlayerCache().data;

    //TODO - Come up with better default values
    const [ player, setPlayer ] = useState({
        player_id: 'null', 
        game_id: 'null',
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
        try {
            getPlayer()
            .then(player => {
                if (!player.error) {
                    setPlayer(player);
                } else {
                    handleError(player.error);
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * @description Attempt to get a player using a player_id and game_id
     * @returns Either a player or an error JSON object
     */
    const getPlayer = async () => {
        try {
            const response = await fetch(`/api/lobbys/${game_id}/${player_id}`)
            .then(response => response.json());

            if (!response.error) {
                return response;
            } else {
                return { error: "Error: " + response.error.code };
            }
        } catch (error) {
            return { error: "Error:" + error.message };
        }
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
            <h1>Hello {player.player_name}, wait for the game {player.game_id} to start idiot</h1>
        </Fragment>
    );
};

export default WaitForGame;