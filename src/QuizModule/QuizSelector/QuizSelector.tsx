import { FunctionComponent, useEffect, useState } from 'react';
import { Categorie } from '../../QuizModule/Models/models';

// Définition des props du composant QuizSelector
interface QuizSelectorProps {
  setSelectedCategory: (idCategorie: number) => void;
  setSelectedDifficultyLevel: (difficultyLevel: string) => void;
  handleCreateForm: () => void;
  quizInitied: boolean;
}

const QuizSelector: FunctionComponent<QuizSelectorProps> = ( props: QuizSelectorProps ) => {
  // Récupération des props
  const {setSelectedCategory, setSelectedDifficultyLevel, handleCreateForm, quizInitied} = props;
  // Hook pour la liste des catégories
  const [categories, setCategories] = useState<Array<Categorie>>([]);
  // Tableau des niveaux de difficulté
  const difficultyLevels: Array<string> = ['easy', 'medium', 'hard'];

  useEffect(() => {
    // Récupération des catégories via l'api
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <select
        id="categorySelect"
        className="form-select"
        onChange={(event) => {
          setSelectedCategory(parseInt(event.target.value));
        }}
        disabled={quizInitied}
      >
        {categories.map((categorie: Categorie, index: number) => (
          <option key={index} value={categorie.id}>{categorie.name}</option>
        ))}
      </select>
      <select
        id="difficultySelect"
        className="form-select"
        onChange={(event) => {
          setSelectedDifficultyLevel(event.target.value);
        }}
        disabled={quizInitied}
      >
        {difficultyLevels.map((difficulty: string, index: number) => (
          <option key={index}>{difficulty}</option>
        ))}
      </select>
      <button
        id="createBtn"
        className="btn btn-primary"
        onClick={handleCreateForm}
        disabled={quizInitied}
      >
        Create
      </button>
    </>
  );
}

export default QuizSelector;
