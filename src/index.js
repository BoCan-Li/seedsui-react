import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/router/router.js'
import FastClick from 'fastclick';
FastClick.attach(document.body);

ReactDOM.render(
  <Router />,
  document.getElementById('root')
)
