import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import "./join_game_style.css";

/* Join Game Screen */
const JoinGame = () => {
    const [player_name, setPlayer_name] = useState("");
    const [game_code, setGame_code] = useState(""); 
    const navigate = useNavigate();

    /* get a game object associated with user inputted game_code */
    const getGame = async (e) => {
        e.preventDefault();

        try {
            /* Make GET request for game */
            console.debug(" Fetching " + ` /api/games/${game_code}`);
            const response = await fetch(`/api/games/${game_code}`);
            const jsonData = await response.json();
            
            /* If game is currently active, create the player */
            if (jsonData.is_active) {
                await createPlayer(jsonData);
            } else {
                console.log("Game " + game_code + " is not active");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    /* Create a player with a username if the game_id was retrieved successfully */
    const createPlayer = async (jsonData) => {
        try {
            const body = { player_name };

            /* Make POST request for player */
            console.debug("Fetching " + ` /api/lobbys/${jsonData.game_id}`);
            const response = await fetch(`/api/lobbys/${jsonData.game_id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //TODO - Only do these when the query was a success
            setPlayer_name('');
            setGame_code('');

            navigateToWaiting();
            
        } catch (error) {
            console.error(error.message);
        }

        /* Reset the input fields */
        
    };

    /* Navigate to the waiting page */
    const navigateToWaiting = () => {
        navigate("/waiting");
    };

    return (
        <Fragment>
            <div class="login-container">
                <h1>Join a Game</h1>
                <div class="login-container2">
                    <form onSubmit={getGame}>
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