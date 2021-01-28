/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:36:53
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-28 00:18:49
 */
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducer';
import actions from './actions';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
