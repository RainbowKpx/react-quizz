import { useEffect, useState } from 'react';
import { Categorie } from '../../QuizModule/Models/models';

function QuizSelector({
  setSelectedCategory,
  setSelectedDifficultyLevel,
  handleCreateForm,
  quizInitied,
}) {
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
          setSelectedCategory(event.target.value);
        }}
        disabled={quizInitied}
      >
        {categories.map((categorie) => (
          <option value={categorie.id}>{categorie.name}</option>
        ))}
      </select>
      <select
        id="difficultySelect"
        className="form-select"
        onChange={(event) => {
          setSelectedDifficultyLevel(event.target.value);
        }}
        //disabled={quizInitied}
      >
        {difficultyLevels.map((difficulty) => (
          <option>{difficulty}</option>
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
