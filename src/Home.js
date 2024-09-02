import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  
    return (
      <div>
        <h1>Welcome to the Quiz App</h1>
        <button>
          <Link to='/quiz'>Start Quiz</Link>
        </button>
        <button>
          <Link to='/highscore'>View High Scores</Link>
        </button>
      </div>
    );
  };

export default Home;