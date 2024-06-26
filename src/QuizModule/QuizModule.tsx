import { FunctionComponent, useState } from 'react';
import QuizSelector from '../QuizModule/QuizSelector/QuizSelector';
import QuizForm from '../QuizModule/QuizForm/QuizForm';
import { Question } from '../QuizModule/Models/models';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuizResult from './QuizResult/QuizResult';

const QuizModule: FunctionComponent = () => {
  // Hook pour la categorie selectionnée
  const [selectedCategory, setSelectedCategory] = useState<number>(9);
  // Hook pour le niveau de difficulté selectionné
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] =
    useState<string>('easy');
  // Hook pour la liste de questions
  const [questionsList, setQuestionList] = useState<Array<Question>>([]);
  // Hook pour la liste de réponses
  const [answers, setAnswers] = useState<Array<string>>(['', '', '', '', '']);
  // Boolean pour savoir si le quiz est initialisé
  const [quizInitied, setQuizInitied] = useState<boolean>(false);

  // Fonction qui gère la récupération des questions via l'API
  const createQuizForm = () => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficultyLevel}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.map((question: Question) => {
          // Une fois les données récupérés nous généront un nouveau champs qui contient l'ensemble des réponses mélangées
          question.shuffled_answers = shuffleAnswers([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
        });
        setQuestionList(data.results);
        setQuizInitied(true);
      })
      .catch((e) => console.log(e));
  };

  // Fonction qui permet de réinitialiser le formulaire du Quiz
  const resetQuizForm = () => {
    setQuizInitied(false);
    setQuestionList([]);
  };

  // Fonction qui retourne un tableau de réponses mélangées
  function shuffleAnswers(array: Array<string>): Array<string> {
    array.sort(function () {
      return Math.random() - 0.5;
    });

    return array;
  }

  // Création du router et des paths
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <QuizSelector
          setSelectedCategory={setSelectedCategory}
          setSelectedDifficultyLevel={setSelectedDifficultyLevel}
          handleCreateForm={createQuizForm}
          quizInitied={quizInitied}
        />
        {!!questionsList && questionsList.length > 0 && <QuizForm questions={questionsList} answers={answers} setAnswers={setAnswers} />}
      </>
    },
    {
      path: "/result",
      element: <>
        <QuizSelector
          setSelectedCategory={setSelectedCategory}
          setSelectedDifficultyLevel={setSelectedDifficultyLevel}
          handleCreateForm={createQuizForm}
          quizInitied={quizInitied}
        />
        <QuizResult questions={questionsList} answers={answers} resetQuizForm={resetQuizForm} />
      </>,
    },
  ]);

  return (
    <>
      <h1>Quizz Maker</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default QuizModule;
