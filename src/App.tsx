import React, {useState, useEffect} from 'react';
import QuestionCard from './components/QuestionCard';

import {fetchQuizQuestions}  from './API';

import {GlobalStyle, Wrapper} from './App.style';

import {
  Difficulty,
  Question,
  QuestionState,
} from './API';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const  App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [useAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  
  useEffect(() => {
    
    
  })
  
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    
    const newQuestions =  await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  
  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      
      if(correct) setScore(prev => prev +1);
      
      const answerObject = {
        question : questions[number].question,
        answer,
        correct,
        correctAnswer : questions[number].correct_answer
      }
      
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }
  
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }
  
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="App">
          <h1>React Quiz</h1>
          {(gameOver || useAnswers.length === TOTAL_QUESTIONS) ? (<button className="start" onClick={startTrivia} >{useAnswers.length === TOTAL_QUESTIONS ? 'Restart' : 'Start'}</button>) : null}
          
          {!gameOver ? (<p className="score">Score : {score}</p>) : null}
          
          {loading ? (<p>Loading Questions ...</p>) : null }
          
          {!loading && !gameOver ? (
          <QuestionCard 
            questionNumber={number +1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={useAnswers ? useAnswers[number] : undefined}
            callback={checkAnswer}
          />) : null}
          
          {!loading && 
          !gameOver && 
          useAnswers.length === number+1 && 
          number !==TOTAL_QUESTIONS -1 ? 
          (<button className="next" onClick={nextQuestion}>Next question</button>) : null}
          
        </div>
      </Wrapper>
    </>
    
  );
}

export default App;
