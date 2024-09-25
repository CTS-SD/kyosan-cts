export const quizzes: QuizDefinition[] = [
  {
    type: "select",
    question:
      "経済学部には４つのコースがある。ビジネス経済コース、地域経済コース、グローバル経済コースとあとひとつは何か",
    answer: "環境経済コース",
    fakes: ["メディア経済コース", "歴史経済コース", "現代経済コース"],
  },
  {
    type: "select",
    question: "図書館の現在の蔵書は約何万冊か",
    answer: "約110万冊",
    fakes: ["約112万冊", "約108万冊", "約106万冊"],
  },
  {
    type: "input",
    question:
      "14号館の3階にある施設で、プロダクトの発表や撮影ができる施設はどこか",
    answer: ["うんちルーム", "うんち"],
  },
  {
    type: "ox",
    question: "情報理工学部はうんちである。",
    answer: false,
  },
];
