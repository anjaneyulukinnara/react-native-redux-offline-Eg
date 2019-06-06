import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { TodoReducer } from './todo.reducer';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { createEpicMiddleware } from "redux-observable";
import epics from './epics';
import axios from 'axios';

const effect = (effect, _action) => axios(effect).then(res => res.data);
const discard = (error, _action, _retries) => {
    const { request, response } = error;
    if (!request) throw error; // There was an error creating the request
    if (!response) return false; // There was no response
    return 400 <= response.status && response.status < 500;
};

const { middleware, enhanceReducer, enhanceStore } = createOffline({ ...offlineConfig, effect, discard });

const epicMiddleware = createEpicMiddleware();

export const Store = createStore(
    enhanceReducer(combineReducers({ todos: TodoReducer })),
    {},
    (compose as any)(enhanceStore, applyMiddleware(epicMiddleware, middleware))
);

epicMiddleware.run(epics);