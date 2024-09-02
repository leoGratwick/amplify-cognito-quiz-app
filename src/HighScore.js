import React from 'react';
import { HomeButton } from './components/HomeButton';
import { get } from 'aws-amplify/api';

const HighScore = () => {

  // get request to API
  async function getTodo() {
    try {
      const restOperation = get({ 
        apiName: 'quizAPI',
        path: '/score' 
      });
      const response = await restOperation.response;
      console.log('GET call succeeded: ', response);
    } catch (e) {
      console.log('GET call failed: ', JSON.parse(e.response.body));
    }
  }

  return (
    <div>
      <h1>High Score</h1>
      <p>High scores will be displayed here.</p>
      <HomeButton/>
    </div>
  );
};

export default HighScore;
