import { decode } from 'html-entities';
import { nanoid } from "nanoid";
import React, { useState, useEffect } from 'react'

import "./Answer.css";

type Props = {
    showAnswer: boolean,
    id: string,
    selectedAnswer: string;
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    handleSelectAnswer: (questionId: string, answer: string) => void,
};

export const OptionPart: React.FC<Props> = ({ 
    showAnswer,
    id,
    selectedAnswer,
    category,
    type,
    difficulty,
    question,
    correctAnswer,
    incorrectAnswers,
    handleSelectAnswer
 }) => {
    const [randomOrder, setRandomOrder] = useState<JSX.Element[]>([]);
    const falsyAnswers = incorrectAnswers.map(answer => {
        const falsyCLassnames = `
        ${selectedAnswer === answer 
            ? "question-btn-selected" 
            : "question-btn"}
        ${(showAnswer && selectedAnswer === answer) && "question-btn-incorrect"}`;

        return <button
            key={nanoid()}
            className={falsyCLassnames}
            onClick={() => handleSelectAnswer(id, answer)}
        >
            {decode(answer)}
        </button>
    });

    const truthyClassname = `
    ${selectedAnswer === correctAnswer 
        ? "question-btn-selected" 
        : "question-btn"}
    ${showAnswer && "question-btn-correct"}`;

    const correctAnswerElement = 
        <button
            key={nanoid()}
            className={truthyClassname}
            onClick={() => handleSelectAnswer(id, correctAnswer)}
        >
            {decode(correctAnswer)}
        </button>

    useEffect(() => {
        falsyAnswers.push(correctAnswerElement);

        const randomizedAnswers = falsyAnswers.sort(() => (Math.random() > 0.5) ? 1 : -1);

        setRandomOrder(randomizedAnswers);
    }, [])

  return (
    <div className="options">   
	    <div>
            <h3 className="option-text">
                {decode(question)}</h3>
            {randomOrder}
		</div>                               
    </div>
  )
}
