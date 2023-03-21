import classNames from 'classnames';
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
    const [randomOrder, setRandomOrder] = useState<string[]>([]);

    useEffect(() => {
        let allAnswers = incorrectAnswers.concat(correctAnswer).sort(() => Math.random() - 0.5);
        
        setRandomOrder(allAnswers);
    }, [correctAnswer, incorrectAnswers]) 
    
  return (
    <div className="question-container">   
	    <div>
            <>
            <h3 className="question-text">
                {decode(question)}</h3>
            {randomOrder.map(answer => (                           
                <button
                    key={nanoid()}
                    onClick={() => handleSelectAnswer(id, answer)}
                    className={classNames('question-btn', {
                        'question-btn-selected': selectedAnswer === answer,
                        'question-btn-incorrect': showAnswer && answer !== correctAnswer && selectedAnswer === answer,
                        'question-btn-correct': showAnswer && answer === correctAnswer,
                    })}
                >
                    {decode(answer)}
                </button>                              
    ))}
            </>           
		</div>                               
    </div>
  )
}
