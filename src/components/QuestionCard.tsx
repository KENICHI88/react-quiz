import React from 'react';
import {AnswerObject} from '../App';

import {Wrapper, ButtonWrapper} from './QuestionCard.style';

type Props = {
  question: string;
  answers: string[];
  callback : (e : React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer : AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number
}

const QuestionCard : React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
  return (
    <Wrapper>
      <div className="question-wrapper">
        <p className="number">
          Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}}></p>
      </div>
      
      <div>
        {answers.map(answer => (<ButtonWrapper 
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        key={answer}>
          <button disabled={!!userAnswer} value={answer}  onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer}}></span>
          </button>
        </ButtonWrapper>))}
      </div>
    </Wrapper>
  )
}

export default QuestionCard;
