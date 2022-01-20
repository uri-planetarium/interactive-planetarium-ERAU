import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getPlayerCache, setPlayerCache } from "../../Cache/player_cache";
import "./join_game_style.css";

/**
 * @description the JoinGame component for the player_client
 * @returns Fragment
 */
const JoinGame = () => {
    const [player_name, setPlayerName] = useState("");
    const [game_code, setGameCode] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        try {
            playerLogin();
        } catch (error) {
            console.error("Error: Couldn't sign-in");
        }
    }, []);

    /**
     * @description Attempt to retrieve a game from the API using a game_code
     * @returns Either a game or an error JSON object
     */
    const getGame = async () => {
        try {
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
            throw new Error(error.message);
        }
    };

    /**
     * @description Attempt to create a player using a player_name and game_id
     * @param {object} gameData 
     * @returns Either a player or an error JSON object
     */
    const createPlayer = async (gameData) => {
        try {
            const body = { player_name };

            /* Make POST request for player */
            const response = await fetch(`/api/lobbys/${gameData.game_code}`, {
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
     * @description Attempt to register a new player
     * @param {Event} e 
     */
    const playerRegister = (e) => {
        e.preventDefault();

        getGame()
        .then(game => {
            createPlayer(game)
            .then(player => {
                console.debug(`Storing Cache: player.id: ${JSON.stringify(player.player_id)} 
                    and game.code: ${JSON.stringify(game.game_code)}`);

                setPlayerCache(player.player_id, game.game_code);
                navigate("/waiting");
            })
            .catch(error => handleError(error));
        })
        .catch(error => handleError(error));
    }

    /**
     * @description Attempt to login if player is stored in cache
     */
    const playerLogin = () => {
        // TODO - Attempt game login via the cached player data
    }

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
                    <form onSubmit={playerRegister}>
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