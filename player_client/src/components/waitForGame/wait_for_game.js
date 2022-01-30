import React, { Fragment, useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket/socket";
import { getPlayerCache, setPlayerCache } from "../../cache/player_cache";
import { getPlayer } from "./wait_for_game_reqs";
import "./wait_for_game_style.css";

/**
 * @description the WaitForGame component for the player_client
 * @returns Fragment
 */
const WaitForGame = () => { 
    const socket = useContext(SocketContext);
    const [ player, setPlayer ] = useState({
        player_id: 'uid-000-000-000-000-000', 
        game_code: '000000',
        player_name: 'null',
        player_score: '0'
    });
    
    /* When the page first renders, retrieve the player data 
     * that was created in the JoinGame component */ 
    useEffect(() => {
        getPlayerInfo();
    }, []);

    /**
     * @description Retrieve player info from the cache
     */
    const getPlayerInfo = () => {
        const { cached_player_id, cached_game_code } = getPlayerCache().data;

        getPlayer(cached_player_id, cached_game_code)
        .then(receivedPlayer => {
            setPlayer(receivedPlayer);
            joinSocketRoom(receivedPlayer.game_code, receivedPlayer.player_name);
        })
        .catch(error => handleError(`Player Retrieval Failure - ${error}`));
    };

    /**
     * @description Join a socket room created by the host and listen for messages
     */
        const joinSocketRoom = (game_code, player_id) => {
            socket.emit("join room", game_code, player_id);
    
            console.debug(`join_game - joined room ${game_code}`);
    
            socket.on("message", (message) => {
                console.log(`join_game - New message: ${message}`);
            });
        };

    /**
     * @description Handle errors from the API connections
     * @param {String} error 
     */
    const handleError = (error) => {
        //TODO - Handle 
        console.error(error);
    }

    /* When use tries to close tab, ask them if they are sure */
    window.addEventListener("beforeunload",  (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.returnValue = '';
    });

    return (
        <Fragment>
            <h1>Yo yo {player.player_name}, wait for the game to start yo!</h1>
        </Fragment>
    );
};

export default WaitForGame;