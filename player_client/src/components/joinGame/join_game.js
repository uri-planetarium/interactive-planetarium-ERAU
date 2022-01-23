import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { SocketContext } from "../../context/socket/socket";
import { getPlayerCache, setPlayerCache } from "../../cache/player_cache";
import { createPlayer, getPlayer, getGame } from "./join_game_reqs";
import "./join_game_style.css";

/**
 * @description the JoinGame component for the player_client
 * @returns Fragment
 */
const JoinGame = () => {
    const socket = useContext(SocketContext);
    const [player_name, setPlayerName] = useState(""); // Set by the user
    const [game_code, setGameCode] = useState("");  // Set by the user
    const navigate = useNavigate();

    /* When the page first renders, attempt a login using 
     * the Player data stored in local storage */ 
    useEffect(() => attemptLogin(), []);

    /**
     * @description Attempt to register a new player
     * @param {Event} e 
     */
    const attemptRegister = (e) => {
        e.preventDefault();

        getGame(game_code)
        .then(game => {
            createPlayer(player_name, game.game_code)
            .then(player => {
                console.debug(`Storing Cache: player.id: ${JSON.stringify(player.player_id)} 
                    and game.code: ${JSON.stringify(game.game_code)}`);

                setPlayerCache(player.player_id, game.game_code);
                joinSocketRoom(game.game_code, player.player_id);

                navigate("/waiting");
            })
            .catch(error => handleError(`Register Failure - ${error}`));
        })
        .catch(error => handleError(`Register Failure - ${error}`));
    }

    /**
     * @description Attempt to login if player is stored in cache
     */
    const attemptLogin = () => {
        const { cached_player_id, cached_game_code } = getPlayerCache().data;

        getPlayer(cached_player_id, cached_game_code)
        .then(player => {
            getGame(cached_game_code)
            .then(game => {
                console.debug("Login Success yay");

                //TODO - Vulnerability - Description in Github Issue
                joinSocketRoom(game.game_code, player.player_id);

                navigate("/waiting");
            })
            .catch(error => handleError(`Login Failure - ${error}`));
        })
        .catch(error => handleError(`Login Failure - ${error}`));
    }

    /**
     * @description Join a socket room created by the host and listen for messages
     * @param {integer} game_code 
     * @param {string} player_id
     */
        const joinSocketRoom = (game_code, player_id) => {
            socket.emit("join room", game_code, player_id);
    
            console.debug(`joined room ${game_code}`);
    
            socket.on("message", (message) => {
                console.log(message);
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

    return (
        <Fragment>
            <div class="login-container">
                <h1>Join a Game</h1>
                <div class="login-container2">
                    <form onSubmit={attemptRegister}>
                        <div class="input-container">
                            <h2>Username</h2>
                            <input class="login-input" type="text" value={player_name} 
                                onChange={ e => setPlayerName(e.target.value)}/>
                        </div>
                        <div class="input-container">
                            <h2>Game Code</h2>
                            <input class="login-input" type="text" value={game_code} 
                                onChange={ e => setGameCode(e.target.value)}/>
                        </div>
                        <button>JOIN</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default JoinGame;