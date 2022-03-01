const util = require('util')

module.exports = function(app, pool, path) {
    /* POST (CREATE) */
    /* Create a new quiz */ 
    app.post("/api/quizzes", async (req, res) => {
        const client = await pool.connect();
        try {
            const { quiz_name, questions } = req.body;
            console.log(quiz_name)
            console.log(questions)
            console.log(questions[0].answers)
            client.query('BEGIN')
            const insertQuiz = 'INSERT INTO quizzes(quiz_name) VALUES($1) RETURNING quiz_id'
            const quiz_result = await client.query(insertQuiz, [quiz_name]);
            console.log(questions[0]);

            for (const question of questions){  
                // insert questions
                console.log(question.question_text);
                const insertQuestion = 'INSERT INTO quiz_questions(quiz_id, question) VALUES ($1, $2) RETURNING quiz_question_id';
                const insertQuestionText = [quiz_result.rows[0].quiz_id, questions[0].question_text];
                const question_result = await client.query(insertQuestion, insertQuestionText);
                const question_id = question_result.rows[0].quiz_question_id;

                for (const a of question.answers) {
                    console.log(a);
                    console.log(" hi ", a.answer_text, a.correct)
                    const insertQuestion = 
                        'INSERT INTO quiz_question_answers(quiz_id, quiz_question_id, is_correct, answer) VALUES ($1, $2, $3, $4) RETURNING quiz_question_id'
                    const insertQuestionText = [quiz_result.rows[0].quiz_id, question_id, a.correct, a.answer_text]
                    console.log(" hi ", a.answer_text, a.correct)
                    const question_result = await client.query(insertQuestion, insertQuestionText)
                
                }
            }
            // const insertAnswers = 'INSERT INTO quiz_questions_answers(quiz_id, quiz_question_id, answer) VALUES ($1, $2)'
            // const insertQuestionText = [result.rows[0].quiz_id, questions[0].question_text]
            // await client.query(insertQuestion, insertQuestionText)

            await client.query('COMMIT');
            res.json(req.body);
            console.log("success!!!!!")

        } catch (error) {
            await client.query('ROLLBACK');

            console.error(error.message);
        }
        finally  {
            client.release();
        }
    });
}
   
//     /* GET (READ) */
//     /* Get all the data of a specific player from a specific game lobby */
//     app.get("/api/lobbys/:game_code/:player_id", async (req, res) => {
//         try {
//             const { game_code, player_id } = req.params;

//             pool.query(
//                 "SELECT * FROM lobbys \
//                 WHERE game_code = $1 AND player_id = $2",
//                 [game_code, player_id],
//                 (err, result) => {
//                     if (err) {
//                         console.error('Error executing query', err.stack);
//                         res.json({ error: err });
//                     } else {
//                         res.json(result.rows[0]);
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error(error.message);
//         }
//     });
   
//     /* GET ALL (READ ALL) */
//     /* Get all players from a specific lobby */
//     app.get("/api/lobbys/:game_code", async (req, res) => {
//         try {
//             const { game_code } = req.params;

//             pool.query(
//                 "SELECT * FROM lobbys \
//                 WHERE game_code = $1",
//                 [game_code],
//                 (err, result) => {
//                     if (err) {
//                         console.error('Error executing query', err.stack);
//                         res.json({ error: err });
//                     } else {
//                         res.json(result.rows);
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error(error.message);
//         }
//     });

//     /* PUT (UPDATE) */
//     /* Change the name of a player in the lobby */
//     app.put("/api/lobbys/:game_code/:player_id", async (req, res) => {
//         try {
//             const { game_code, player_id } = req.params;
//             const { player_name } = req.body;

//             pool.query(
//                 "UPDATE lobbys SET player_name = $1 \
//                 WHERE game_code = $2 AND player_id = $3",
//                 [player_name, game_code, player_id],
//                 (err, result) => {
//                     if (err) {
//                         console.error('Error executing query', err.stack);
//                         res.json({ error: err });
//                     } else {
//                         res.json("Player " + player_id + " was updated");
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error(error,message);
//         }
//     });
   
//     /* DELETE (DELETE) */
//     /* Delete a player from a specific game lobby */
//     app.delete("/api/:game_code/:player_id", async (req, res) => {
//         try {
//             const { game_code, player_id } = req.params;

//             pool.query(
//                 "DELETE FROM lobbys WHERE \
//                 game_code = $1 AND player_id = $2",
//                 [game_code, player_id],
//                 (err, result) => {
//                     if (err) {
//                         console.error('Error executing query', err.stack);
//                         res.json({ error: err });
//                     } else {
//                         res.json("Player " + player_id + " was deleted");
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error(error.message);
//         }
//     });
// }



