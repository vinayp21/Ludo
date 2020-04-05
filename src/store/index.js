import { createStore } from 'redux'
import rootReducer from '../reducers/test';
export const store = createStore(rootReducer, { data: 1 })
