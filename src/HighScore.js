import React from 'react';
import { HomeButton } from './components/HomeButton';
import { get } from 'aws-amplify/api';
import { isAuthenticated, getEmail } from '.';
import { useState, useEffect } from 'react';
import { UnAuthenticated } from './components/UnAuthenticated';

const HighScore = () => {

  // get request to API
  async function getTodo(email) {
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


  // get highscore from database using api request
  const [highscore, setHighscore] = useState(0)
  useEffect(() => {
    
    async function getHighscore() {
      const email = await getEmail();
      const hs = await getTodo(email);
      console.log(hs)
      setHighscore(hs);
    }

    getHighscore();
  }, [])

  if (authenticated === null) return <div className='centred'>Loading...</div>;
  if (authenticated) return (
     
      <div>
      <h1>High Score</h1>
      <p>High scores will be displayed here.</p>
      <div>{highscore}</div>
      <HomeButton/>
    </div>
  );
  return <UnAuthenticated/>;

  
};

export default HighScore;
