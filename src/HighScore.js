import React from 'react';
import { HomeButton } from './components/HomeButton';
import { get } from 'aws-amplify/api';
import { isAuthenticated, getEmail } from '.';
import { useState, useEffect } from 'react';
import { UnAuthenticated } from './components/UnAuthenticated';

const HighScore = () => {

  

  // get request to API
  async function getTodo() {
    try {
      const restOperation = get({ 
        apiName: 'quizAPI',
        path: '/score',
        
      });
      const response = await restOperation.response;
      console.log('GET call from HighScore succeeded: ', response);
      // console.log('response body: ', response.body.json());
      return response.body.json()
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
  const [highscore, setHighscore] = useState(null)
  useEffect(() => {
    
    async function getHighscore() {
      const email = await getEmail();
      const data = await getTodo();
      const userScores = data.filter(item => item.user === email);
      const hs = userScores.reduce((max, item) => 
        item.score > max ? item.score : max, 0 // Initial max is 0
      );
      console.log(userScores)
      console.log(hs)
      setHighscore(hs);
    }

    getHighscore();
  }, [])

  if (authenticated === null) return <div className='centred'>Loading...</div>;
  if (authenticated) return (
     
      <div className='centred'>
      <h1>High Score:</h1>
      <h1 className='highscore'>{highscore}</h1>
      <HomeButton/>
    </div>
  );
  return <UnAuthenticated/>;

  
};

export default HighScore;
