import { Question } from '../types/Question'

const BASE_URL = 'https://opentdb.com/api.php?amount=5'

export const getQuestions = (): Promise<Question[]> => {
    return fetch(BASE_URL)
    .then(response => response.json())
}