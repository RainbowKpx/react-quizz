import { FunctionComponent } from "react";
import { Question } from "../Models/models";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface QuizResultProps {
    questions: Array<Question>;
    answers: Array<string>;
    resetQuizForm: () => void;
}

const QuizResult: FunctionComponent<QuizResultProps> = (props: QuizResultProps) => {
    // Récupération des props
    const { questions, answers, resetQuizForm } = props;
    // Hook du router dom utilisé pour la redirection
    const navigate: NavigateFunction = useNavigate();

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

    return <>
        {questions.map((question: Question, indexQuestion: number) => (
            <div key={indexQuestion}>
                <p dangerouslySetInnerHTML={{ __html: question.question }} />
                {question.shuffled_answers &&
                    question.shuffled_answers.map((answer: string, index: number) => (
                        <button
                            key={index}
                            className={`answer btn 
              ${question.correct_answer === answer && 'btn-success'}
              ${question.correct_answer !== answer &&
                                answers[indexQuestion] === answer &&
                                'btn-danger'
                                }                    
              ${question.correct_answer !== answer &&
                                answers[indexQuestion] !== answer &&
                                'btn-dark'
                                }`}
                            disabled
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    ))}
            </div>
        ))}
        <br />
        <div
            className={`alert 
      ${getResult() < 3 && 'alert-danger'}
      ${getResult() >= 3 && getResult() < 4 && 'alert-warning'}
      ${getResult() <= 4 && 'alert-success'}`}
        >
            You scored {getResult()} out of 5
        </div>
        <button className="btn btn-primary" onClick={() => {
            resetQuizForm();
            navigate("/");
        }}>
            Create a new quizz
        </button>
    </>;
}

export default QuizResult;