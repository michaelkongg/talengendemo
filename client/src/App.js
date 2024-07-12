import React from 'react';
import './App.css';
import SurveyForm from './SurveyForm';
import VideoCall from './VideoCall';

function App() {
  return (
    <div className="App">
      <h1>Graduate Employability Survey</h1>
      <SurveyForm />
      <h1>Real-Time Video Call</h1>
      <VideoCall />
    </div>
  );
}

export default App;
