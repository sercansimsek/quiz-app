import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./Question.css";

import { getQuestions } from "../../utils/api";
import { Options } from '../../types/Options';
import { Questions } from '../../types/Question';
import { OptionPart } from '../Answer/Answers';

type Props = {
	gameOptions: Options,
	handleGameStart: () => void,
	handleNoQuestionsError: (a: boolean) => void,
};

export const QuestionPart: React.FC<Props> = ({ gameOptions, handleGameStart, handleNoQuestionsError }) => {
	const [questionsArray, setQuestionsArray] = useState<Questions[]>([]);
	const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);

	useEffect(() => {
		getQuestions(gameOptions).then(questions => {
			if (questions.length === 0) {
				handleGameStart();
				handleNoQuestionsError(true);
				return;
			} else {
				handleNoQuestionsError(false);
			}

			return setQuestionsArray(questions.map((question: Questions) => {
				return {
					...question,
					id: nanoid(),
					selectedAnswer: "",
					showAnswer: false
				}
			}));
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const allQuestionsAnswered = questionsArray.every(question => question.selectedAnswer !== "");

	useEffect(() => {
		if (questionsArray.length !== 0 && allQuestionsAnswered) {
			let correctAnswers = 0;
			
			questionsArray.forEach(question => {
				if (question.correct_answer === question.selectedAnswer)
					correctAnswers++;
			});

			setCorrectAnswersCount(correctAnswers);
			setCheckAnswerBtn(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionsArray]);


	const handleSelectAnswer = (questionId: string, answer: string) => {
		if (!isGameOver) {
			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === questionId
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}

	const checkAnswers = () => {
		if (allQuestionsAnswered) {
			setIsGameOver(true);

			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => ({...question, showAnswer: true }))
			));
		}
	}

	const resetGame = () => {
		setCheckAnswerBtn(false);
		setIsGameOver(false);
		handleNoQuestionsError(true);
		handleGameStart();
	};

	const questionElements = questionsArray.map(question => (
		<OptionPart
			key={question.id}
			id={question.id}
			question={question.question}
			correctAnswer={question.correct_answer}
			incorrectAnswers={question.incorrect_answers}
			difficulty={question.difficulty}
			category={question.category}
			selectedAnswer={question.selectedAnswer}
			showAnswer={question.showAnswer}
			handleSelectAnswer={handleSelectAnswer} type={''}		/>
	));

	return (
		<section className="questionList-container">
			{questionElements}

			<div className="bottom-container">
				{isGameOver &&
					<h3 className="correct-answers-text">
						You scored {correctAnswersCount}/5 correct answers
					</h3>
				}

				<button
					className={`btn-primary ${checkAnswerBtn
						? "btn-check-answers"
						: "btn-check-answers-disabled"}`}
					onClick={isGameOver ? resetGame : checkAnswers}
				>
					{isGameOver ? "Play again" : "Check answers"}
				</button>
			</div>
		</section>
	);
}