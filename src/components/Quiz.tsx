import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Question } from '../types/Question'

const BASE_URL = 'https://opentdb.com/api.php?amount=5';

export const Quiz = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    const loadQuestions = async () => {
        try {
            const loadedQuestions = await axios.get(BASE_URL);

            setQuestions(loadedQuestions.data.results);
        } catch (error) {
            setErrorMessage('unable to load questions')
        }      
    };

    useEffect(() => {
        loadQuestions();
    }, []);
  
    
    return (   
        <div className="quiz">
          {questions.map((question, index) => (
            <>
            <h2 
                key={index}
                className="question"
            >
                {question.question}
            </h2>

            <div className="options">
                <button 
                    type='button'
                    className={cn('option-text', {
                        'active': selectedOptionIndex === index,
                    })}
                    onClick={() => {
                        setSelectedOptionIndex(index);
                    }}
                >
                    {question.correct_answer}
                </button>
          

            {question.incorrect_answers.map((answer) => (
                <button 
                    className={cn('option-text', {
                        'active': selectedOptionIndex === index,
                    })}
                    onClick={() => {
                        setSelectedOptionIndex(index);
                    }}
                    key={answer}
                    type='button'
                >
                    {answer}
                </button>
            ))}
            </div>

            <div className="seperator"></div>
            </>
          
          ))}

          <button 
            type='button'
            className="check-button"
          >
            Check answers
          </button>
                        
        </div>
    );
};