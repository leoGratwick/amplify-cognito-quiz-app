import React from 'react';
import { Link } from 'react-router-dom';

const HighScore = () => {
  return (
    <div>
      <h1>High Scores</h1>
      <p>High scores will be displayed here.</p>
      <Link to='/'>Back Home</Link>
    </div>
  );
};

export default HighScore;
