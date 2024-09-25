type SelectQuiz = {
  type: "select";
  question: string;
  answer: string;
  fakes: string[];
};

type OXQuiz = {
  type: "ox";
  question: string;
  answer: boolean;
};

type InputQuiz = {
  type: "input";
  question: string;
  answer: string | string[];
};

type QuizDefinition = SelectQuiz | OXQuiz | InputQuiz;

type Quiz = (SelectQuiz | OXQuiz | InputQuiz) & {
  id: number;
};

type Result = {
  correct: boolean;
  userAnswer: string | boolean;
  quiz: Quiz;
};
