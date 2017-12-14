import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes.js'
import 'components/seedsui/seedsui.less';
import 'components/seedsui/seedsui.js';

import FastClick from 'fastclick';
FastClick.attach(document.body);

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
)
