export interface Question {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: boolean,
    incorrect_answers: string[],
}