import React from 'react';
import { HomeButton } from './components/HomeButton';
import { get } from 'aws-amplify/api';
import { isAuthenticated } from '.';
import { useState, useEffect } from 'react';
import { UnAuthenticated } from './components/UnAuthenticated';

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


  // Authentication
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      const result = await isAuthenticated();
      setAuthenticated(result);
    }

    checkAuthentication();
  }, []);

  if (authenticated === null) return <div className='centred'>Loading...</div>;
  if (authenticated) return (
     
      <div>
      <h1>High Score</h1>
      <p>High scores will be displayed here.</p>
      <HomeButton/>
    </div>
  );
  return <UnAuthenticated/>;

  
};

export default HighScore;
