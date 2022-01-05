CREATE DATABASE planetarium_uri_db;

DROP TABLE IF EXISTS lobbys;
DROP TABLE IF EXISTS games;

CREATE TABLE games (
    game_id INT GENERATED ALWAYS AS IDENTITY,
    game_code INT NOT NULL CHECK (game_code >= 0) UNIQUE,
    is_active BOOL NOT NULL DEFAULT false,
    is_playing BOOL NOT NULL DEFAULT false,
    PRIMARY KEY (game_id)
);

CREATE TABLE lobbys (
    player_id INT GENERATED ALWAYS AS IDENTITY,
    game_id INT,
    player_name VARCHAR(20) NOT NULL,
    player_score INT NOT NULL CHECK (player_score >= 0) DEFAULT 0,
    UNIQUE (game_id, player_name),
    PRIMARY KEY (player_id),
    CONSTRAINT foreign_game_id
        FOREIGN KEY (game_id)
            REFERENCES games(game_id)
);