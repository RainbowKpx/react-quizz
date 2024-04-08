import { FunctionComponent, useEffect, useState } from 'react';
import { Question } from '../../QuizModule/Models/models';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// Définition des props du composant QuizForm
interface QuizFormProps {
  questions: Array<Question>;
  answers: Array<string>;
  setAnswers: (answers: Array<string>) => void;
}

const QuizForm: FunctionComponent<QuizFormProps> = (props: QuizFormProps) => {
  // Récupération des props
  const { questions, answers, setAnswers } = props;
  // Hook pour le boolean qui permet d'afficher le bouton de soumission
  const [displaySubmit, setDisplaySubmit] = useState<boolean>(false);
  // Hook pour le boolean qui permet de savoir si le formulaire est soumis
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // Hook du router dom utilisé pour la redirection
  const navigate: NavigateFunction = useNavigate();

  // Méthode qui gère le click sur une réponse
  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>, indexQuestion: number) => {
    let newAnswers = [...answers];
    newAnswers[indexQuestion] = (e.target as HTMLButtonElement).value;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    setDisplaySubmit(!answers.includes(''));
  }, [answers]);

  return (
    <>
      {questions.length > 0 && !isSubmitted && (
        <>
          {questions.map((question: Question, indexQuestion: number) => (
            <div key={indexQuestion}>
              <p dangerouslySetInnerHTML={{ __html: question.question }} />
              {question.shuffled_answers &&
                question.shuffled_answers.map((answer: string, index: number) => (
                  <button
                    key={index}
                    className={`answer btn ${answers[indexQuestion] === answer ? 'btn-success' : 'btn-dark'
                      }`}
                    value={answer}
                    onClick={(e) => {
                      handleClickAnswer(e, indexQuestion);
                    }}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                ))}
            </div>
          ))}
          {displaySubmit && (
            <p>
              <br />
              <button
                className="btn btn-primary"
                disabled={isSubmitted}
                onClick={() => {
                  setIsSubmitted(true);
                  navigate("/result")
                }}
              >
                Submit
              </button>
            </p>
          )}
        </>
      )}
    </>
  );
}

export default QuizForm;
