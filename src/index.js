import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; 
import FastClick from 'fastclick';
import Route from './router/index.js';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from '@/store/store'
import './style/base.css'
FastClick.attach(document.body)
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
      <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
}
render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

// ReactDOM.render(
//   //绑定redux、热加载
//   <Home />,
//   document.getElementById('root')
// )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
