-- tmp.sql
select * from quizzes as q 
inner join quiz_questions as qq on qq.quiz_id == q.quiz_id 
inner join quiz_question_answers as qqa on qqa.quiz_id == qq.quiz_id AND qqa.quiz_question_id == qq.quiz_question_id; 