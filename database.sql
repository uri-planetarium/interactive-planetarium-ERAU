CREATE DATABASE planetarium_uri_db;

CREATE EXTENSION pgcrypto; 

DROP TABLE IF EXISTS lobbys;
DROP TABLE IF EXISTS games;

CREATE TABLE games (
    game_code INT NOT NULL CHECK (game_code >= 0) UNIQUE,
    is_active BOOL NOT NULL DEFAULT 'true',
    is_playing BOOL NOT NULL DEFAULT 'false',
    PRIMARY KEY (game_code)
);

CREATE TABLE lobbys (
    player_id TEXT DEFAULT ('uid-' || gen_random_uuid()),
    game_code INT,
    player_name VARCHAR(20) NOT NULL,
    player_score INT NOT NULL CHECK (player_score >= 0) DEFAULT 0,
    UNIQUE (game_code, player_name),
    PRIMARY KEY (player_id),
    CONSTRAINT foreign_game_code
        FOREIGN KEY (game_code)
            REFERENCES games(game_code)
);