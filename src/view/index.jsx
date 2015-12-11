'use strict';
import './style.pattern';
import React from 'react';
import ReactDOM from 'react-dom';

import bridgeAdapter from './bridgeAdapter';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import reducer from './actions/index';
import router from './router';

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

let store = finalCreateStore(reducer, Map());
bridgeAdapter(extensionBridge, store);

ReactDOM.render((
  <div>
    <Provider store={store}>
      {router}
    </Provider>
  </div>
), document.getElementById('content'));

