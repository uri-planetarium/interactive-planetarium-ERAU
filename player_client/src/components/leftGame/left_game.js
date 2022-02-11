import React, { Fragment } from "react";
import { useNavigate } from "react-router";

const LeftGame = () => {
    const navigate = useNavigate();
    
    window.addEventListener("popstate", e => {  
        navigate('/', {replace: true});
    });

    return (
        <Fragment>
            <h1>AYO!</h1>
            <h3>You have been removed from the game.</h3>
            <p>I wonder how that happened (ー_ーゞ</p>
        </Fragment>
    );
};

export default LeftGame;