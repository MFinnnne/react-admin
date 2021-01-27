/*
 * @Descripttion: 
 * @version: 
 * @Author: MFine
 * @Date: 2021-01-27 23:36:53
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-27 23:55:42
 */
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default createStore(reducer,applyMiddleware(thunk))
