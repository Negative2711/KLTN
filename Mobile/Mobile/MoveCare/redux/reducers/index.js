// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
