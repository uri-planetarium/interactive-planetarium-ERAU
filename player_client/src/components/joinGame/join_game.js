import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getPlayerCache, setPlayerCache } from "../../Cache/player_cache";
import "./join_game_style.css";

/**
 * @description the JoinGame component for the player_client
 * @returns Fragment
 */
const JoinGame = () => {
    const [player_name, setPlayer_name] = useState("");
    const [game_code, setGame_code] = useState(""); 
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
                    return { error: "Error: Game " + game_code + " is not active"};
                }
            } else {
                return { error: "Error: " + response.error.code };
            }
        } catch (error) {
            return { error: "Error: " + error.message };
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
            const response = await fetch(`/api/lobbys/${gameData.game_id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            .then(response => response.json());

            /* If there was an error with the query, return it */
            if (!response.error) {
                return response;
            } else {
                return { error: "Error: " + response.error.code };
            }
        } catch (error) {
            return { error: "Error: " + error.message };
        }
    };

    /**
     * @description Attempt to register a new player
     * @param {Event} e 
     */
    const playerRegister = (e) => {
        e.preventDefault();

        /* First retrieve the game then create a new player */
        getGame()
        .then(game => {
            if (!game.error) {
                createPlayer(game)
                .then(player => {
                    if (!player.error) {
                        console.log("Storing player data to cache: " + JSON.stringify(player));
                        setPlayerCache(player);
                        navigate("/waiting");
                    } else {
                        handleError(player.error);
                    }
                });
            } else {
                handleError(game.error);
            }  
        });
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
                                onChange={ e => setPlayer_name(e.target.value)}/>
                        </div>
                        <div class="input-container">
                            <h2>Game Code</h2>
                            <input class="login-input" type="text" value={game_code} 
                                onChange={ e => setGame_code(e.target.value)}/>
                        </div>
                        <button>JOIN</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default JoinGame;