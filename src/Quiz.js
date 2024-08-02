import React, { useState } from 'react';
import quizData from './quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(null);

  
  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Delay moving to the next question to allow the user to see feedback
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null); // Reset for the next question
        setSelectedAnswer(""); // Reset selected answer
      } else {
        setShowScore(true);
        // put score in DB here
      }
    }, 1500); // Adjust time as needed
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(""); 
    setIsCorrect(null);
  }

  return (
    <div className='quiz'>
      {showScore ? (
        <div>
        <div className='score-section'>
          You scored {score} out of {quizData.length}
          
        </div>
        <button onClick={() => restartQuiz()}>
        Retake Quiz
      </button>
      </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className='question-text'>{quizData[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {quizData[currentQuestion].options.map((option) => (
              <button 
                className='answer-option'
                onClick={() => handleAnswerOptionClick(option)} 
                key={option}
                style={{ padding: '2px 7px',
                    borderRadius: '7px', 
                    margin: '10px', 
                    backgroundColor: selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '' }
                    
                }
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div style={{ margin: '10px' }}>
              {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;