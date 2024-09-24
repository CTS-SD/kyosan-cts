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

type Quiz = SelectQuiz | OXQuiz | InputQuiz;

type Result = {
  correct: boolean;
  userAnswer: string | boolean;
  quiz: Quiz;
};
