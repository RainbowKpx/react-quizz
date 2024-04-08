import { useEffect, useState } from 'react';
import { Question } from '../../QuizModule/Models/models';

function QuizForm({ questions, resetQuizForm }) {
  // Hook pour la liste de réponses
  const [answers, setAnswers] = useState<Array<string>>(['', '', '', '', '']);
  // Hook pour le boolean qui permet d'afficher le bouton de soumission
  const [displaySubmit, setDisplaySubmit] = useState<boolean>(false);
  // Hook pour le boolean qui permet de savoir si le formulaire est soumis
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Méthode qui gère le click sur une réponse
  const handleClickAnswer = (e, indexQuestion: number) => {
    let newAnswers = [...answers];
    newAnswers[indexQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  // Méthode qui permet de retourner le résultat du Quiz
  function getResult(): number {
    let score = 0;
    questions.forEach((question: Question) => {
      if (answers.includes(question.correct_answer)) {
        score++;
      }
    });
    return score;
  }

  useEffect(() => {
    setDisplaySubmit(!answers.includes(''));
  }, [answers]);

  return (
    <>
      {questions.length > 0 && !isSubmitted && (
        <>
          {questions.map((question: Question, indexQuestion: number) => (
            <div key={indexQuestion}>
              <p>{question.question}</p>
              {question.shuffled_answers &&
                question.shuffled_answers.map((answer: string, index: number) => (
                  <button
                    key={index}
                    className={`btn ${
                      answers[indexQuestion] === answer ? 'btn-success' : 'btn-dark'
                    }`}
                    value={answer}
                    onClick={(e) => {
                      handleClickAnswer(e, indexQuestion);
                    }}
                  >
                    {answer}
                  </button>
                ))}
            </div>
          ))}
          {displaySubmit && (
            <p>
              <button
                className="btn btn-primary"
                disabled={isSubmitted}
                onClick={() => {
                  setIsSubmitted(true);
                }}
              >
                Submit
              </button>
            </p>
          )}
        </>
      )}
      {isSubmitted && (
        <>
          {questions.map((question: Question, indexQuestion: number) => (
            <div key={indexQuestion}>
              <p>{question.question}</p>
              {question.shuffled_answers &&
                question.shuffled_answers.map((answer: string, index: number) => (
                  <button
                    key={index}
                    className={`btn 
                    ${question.correct_answer === answer && 'btn-success'}
                    ${
                      question.correct_answer !== answer &&
                      answers[indexQuestion] === answer &&
                      'btn-danger'
                    }                    
                    ${
                      question.correct_answer !== answer &&
                      answers[indexQuestion] !== answer &&
                      'btn-dark'
                    }`}
                    disabled
                  >
                    {answer}
                  </button>
                ))}
            </div>
          ))}
          <br />
          <br />
          <div
            className={`alert 
            ${getResult() < 3 && 'alert-danger'}
            ${getResult() >= 3 && getResult() < 4 && 'alert-warning'}
            ${getResult() <= 4 && 'alert-success'}`}
          >
            You scored {getResult()} out of 5
          </div>
          <button className="btn btn-primary" onClick={resetQuizForm}>
            Create a new quizz
          </button>
        </>
      )}
    </>
  );
}

export default QuizForm;
