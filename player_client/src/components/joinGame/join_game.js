import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getPlayerCache, setPlayerCache } from "../../cache/player_cache";
import { createPlayer, getPlayer, getGame } from "./join_game_reqs";
import "./join_game_style.css";

/**
 * @description the JoinGame component for the player_client
 * @returns Fragment
 */
const JoinGame = () => {
    const [player_name, setPlayerName] = useState(""); // Set by the user
    const [game_code, setGameCode] = useState("");  // Set by the user
    const navigate = useNavigate();

    /* When the page first renders, attempt a login using 
     * the Player data stored in local storage */ 
    //useEffect(() => attemptLogin(), []);

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
                console.debug(`join_game - Storing Cache: player.id: ${JSON.stringify(player.player_id)} 
                    and game.code: ${JSON.stringify(game.game_code)}`);

                setPlayerCache(player.player_id, game.game_code);
                navigate("/waiting");
            })
            .catch(error => handleError(`Register Failure - ${error}`));
        })
        .catch(error => handleError(`Register Failure - ${error}`));
        //TODO: The user should receive an error modal if this becomes an error
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

                console.debug("join_game - Login Success yay");
                navigate("/waiting");
            })
            .catch(error => handleError(`Login Failure - ${error}`));
        })
        .catch(error => handleError(`Login Failure - ${error}`));
        //TODO: The user should receive an error modal if this becomes an error
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
                            <input class="login-input" value={game_code} 
                                onChange={ e => setGameCode(e.target.value)}/>
                        </div>
                        <button>JOIN</button>
                    </form>
                </div>
            </div>
            
            <div class="planet">
                <div>
                    <img src="https://i.imgur.com/bSUfuYs.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/baQpJrM.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/ij9nZQN.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/x6WhUhv.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/RgfJ0Xr.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/IOkuBKj.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/KOV9LKW.png" alt="" height="75px" width="75px"></img>
                </div>
            </div>

            <div class="planet planet1">
                <div>
                    <img src="https://i.imgur.com/bSUfuYs.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/baQpJrM.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/ij9nZQN.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/x6WhUhv.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/RgfJ0Xr.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/IOkuBKj.png" alt="" height="75px" width="75px"></img>
                </div>
                <div>
                    <img src="https://i.imgur.com/KOV9LKW.png" alt="" height="75px" width="75px"></img>
                </div>
            </div>

        </Fragment>
    );
};


export default JoinGame;
