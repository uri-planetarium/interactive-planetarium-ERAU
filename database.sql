CREATE DATABASE planetarium_uri_db;
\c planetarium_uri_db;
CREATE EXTENSION pgcrypto;  

DROP TABLE IF EXISTS lobbys;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS quizzes,
 quiz_questions,quiz_question_answers CASCADE;

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

CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    quiz_name VARCHAR(50)
);

CREATE TABLE quiz_questions (
    quiz_id INT,
    quiz_question_id SERIAL,
    question  VARCHAR(50),
    CONSTRAINT foreign_quiz_id
        FOREIGN KEY (quiz_id)
            REFERENCES quizzes(quiz_id),
    PRIMARY KEY (quiz_id, quiz_question_id)
);

CREATE TABLE quiz_question_answers (
    quiz_id INT,
    quiz_question_id INT,
    answer_id SERIAL UNIQUE,
    is_correct boolean,
    answer VARCHAR(50),
    CONSTRAINT foreign_quiz_id  
        FOREIGN KEY (quiz_id)
            REFERENCES quizzes(quiz_id),
    CONSTRAINT foreign_quiz_question_id
        FOREIGN KEY (quiz_id, quiz_question_id)
            REFERENCES quiz_questions(quiz_id, quiz_question_id),
    PRIMARY KEY (quiz_id, quiz_question_id, answer_id)
);
