import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';


import App from '../imports/ui/App.jsx';
import AppState from '../imports/states/appState.js';

const appState = new AppState();


Meteor.startup( ()=>{
  render(
    <AppContainer>
      <App appState={appState} />
    </AppContainer>,
    document.getElementById('render-target')
  );
});
