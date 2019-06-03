import { createStore, combineReducers, compose } from 'redux';
import { TodoReducer } from './todo.reducer';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';


export const Store = createStore(
    combineReducers({ todos: TodoReducer }),
    {},
    compose(offline(offlineConfig))
)