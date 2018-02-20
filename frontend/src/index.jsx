import React from 'react';
import { useStrict } from 'mobx';
import { render } from 'react-dom';
import {auth, initializeApp} from 'firebase/app';
import 'firebase/auth';

import App from './App';

import config from './config';
import userStore from './user';

initializeApp(config);
useStrict(true);

auth().onAuthStateChanged(user => {
  if (user) {

    const { email, displayName } = user;

    const loggedIn = true;

    userStore.setState({ email, displayName, loggedIn });
    return;
  }
});

const el = document.createElement('div');
document.body.appendChild(el);

render(<App />, el);
