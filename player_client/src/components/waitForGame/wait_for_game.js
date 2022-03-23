import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { SocketContext } from "../../context/socket/socket";
import { getPlayerCache } from "../../cache/player_cache";
import { getPlayer } from "./wait_for_game_reqs";
import "./wait_for_game_style.css";

/**
 * @description the WaitForGame component for the player_client
 * @returns Fragment
 */
const WaitForGame = () => { 
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
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
            joinSocketRoom(receivedPlayer.game_code, receivedPlayer.player_id);
        })
        .catch(error => handleError(`Player Retrieval Failure - ${error}`));
        //TODO: The user should receive an error modal if this becomes an error
    };

    /**
     * @description Join a socket room created by the host and listen for messages
     */
    const joinSocketRoom = (game_code, player_id) => {
        socket.emit("join room", game_code, player_id);

        console.debug(`join_game - joined room ${game_code}`);

        socket.on("game start", () => {
            console.log(`join_game - game start`);
        });

<<<<<<< HEAD
        socket.on("you have been removed", ({ removed_game_code, removed_player_id }) => {
=======
        socket.on("removed", ({ removed_game_code, removed_player_id }) => {
>>>>>>> origin/main
            console.log(`Game Code: ${removed_game_code}\nPlayer Id: ${removed_player_id}\n`);
            if ((removed_player_id === "all" || 
                removed_player_id === player_id) && 
                (removed_game_code === game_code)) {
                socket.emit("leave room");
                navigate("/removed");
            };
        });
    };

    /**
     * @description Send a socket.io message to Host to leave the game
     */
    const leaveGame = () => {
        socket.emit("leave game");
    }

    /**
     * @description Handle errors from the API connections
     * @param {String} error 
     */
    //NOTE: Consider whether we even want a universal way to handle errors
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
            <button onClick={leaveGame}>Leave Game</button>
        </Fragment>
    );
};

export default WaitForGame;