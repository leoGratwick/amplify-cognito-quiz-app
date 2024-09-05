import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  
    return (
      <div className='centred'>
        <h1>Welcome to the Quiz App</h1>
        <button className='btn'>
          <Link to='/quiz'>Start Quiz</Link>
        </button>
        <button className='btn'>
          <Link to='/highscore'>View Your High Score</Link>
        </button>
      </div>
    );
  };

export default Home;