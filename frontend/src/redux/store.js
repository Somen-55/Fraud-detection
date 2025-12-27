import { createStore } from 'redux';

const initialState = { transactions: [] };

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
