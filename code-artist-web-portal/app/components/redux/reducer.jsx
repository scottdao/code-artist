/*import { createStore } from 'redux'*/
import {combineReducers } from 'redux';

import counter from './counter'

const defaultState = 0;

const reducer = (state=0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};



const adder= (state=0,action)=>{//添加方法；
  //console.log(action.num);
  //state = action.num || 0
  switch (action.type) {
    case 'adde':
      let st =  state + 1;
      //console.log(st)
      return st<=action.max?st : action.max;
    case 'min':
      let mn = state - 1;
      return mn>=action.min?mn : action.min;
    default: 
      return state;
  }
};

export default combineReducers({
  reducer,
  counter,
  adder,
})