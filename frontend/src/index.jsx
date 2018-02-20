import React from 'react';
import { useStrict } from 'mobx';
import { render } from 'react-dom';
import {initializeApp} from 'firebase/app';
import 'firebase/auth';

import App from './App';

import config from './config';

initializeApp(config);
useStrict(true);

const el = document.createElement('div');
document.body.appendChild(el);

render(<App />, el);
