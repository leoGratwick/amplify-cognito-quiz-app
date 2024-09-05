import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HighScore from './HighScore';
import Quiz from './Quiz';
import NotFoundPage from './NotFoundPage';
import reportWebVitals from './reportWebVitals';
import {fetchUserAttributes} from '@aws-amplify/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeButton } from './components/HomeButton';


var isAuth = false

export async function isAuthenticated() {
  var signedIn = false;
  try {
    const attributes = await fetchUserAttributes();
    console.log("user signed in")
    signedIn = true;
  } catch (error){
    console.log("user not signed in")
  }
  
  return signedIn;
}

export async function getEmail() {
  const attributes = await fetchUserAttributes();
  // console.log(attributes.email);
  return attributes.email;
}

isAuth = isAuthenticated();


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/quiz',
    element: <Quiz/>,
    
  },
  {
    path: '/highscore',
    element:
        <HighScore/>
          ,
  }
  

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
