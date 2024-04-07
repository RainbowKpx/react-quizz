export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  shuffled_answers: Array<string>;
}

export interface Categorie {
  id: number;
  name: string;
}
