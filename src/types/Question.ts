export interface Questions {
    showAnswer: boolean,
    id: string,
    selectedAnswer: string;
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}